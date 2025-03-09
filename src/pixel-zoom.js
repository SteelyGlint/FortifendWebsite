/**
 * PixelZoom - A pixel-perfect zoom and pan implementation for pixel art
 * For Fortifend website, integrated with BEM structure
 */

export class PixelZoom {
    /**
     * @param {Object} options - Configuration options
     * @param {string} options.thumbnailSelector - CSS selector for thumbnail images
     * @param {string} options.fullscreenSelector - CSS selector for the fullscreen container
     * @param {string} options.imgSelector - CSS selector for the image inside fullscreen container
     * @param {number} options.minScale - Minimum zoom scale (default: 1)
     * @param {number} options.maxScale - Maximum zoom scale (default: 8)
     * @param {number} options.scaleStep - Amount to scale per zoom action (default: 1)
     * @param {boolean} options.smoothTransition - Whether to animate transitions (default: true)
     */
    constructor(options) {
        this.options = Object.assign({
            thumbnailSelector: '.gallery__image',
            fullscreenSelector: '.gallery__fullscreen',
            imgSelector: '.gallery__fullscreen-image',
            minScale: 1,
            maxScale: 8,
            scaleStep: 1,
            smoothTransition: true
        }, options);

        this.scale = this.options.minScale;
        this.currentX = 0;
        this.currentY = 0;
        this.startX = 0;
        this.startY = 0;
        this.isDragging = false;
        this.pinchDistance = 0;
        this.fullscreenOpen = false;
        this.highResSrc = null;

        this.init();
    }

    /**
     * Initialize the zoom/pan functionality
     */
    init() {
        // Select DOM elements
        this.thumbnails = document.querySelectorAll(this.options.thumbnailSelector);
        this.fullscreenContainer = document.querySelector(this.options.fullscreenSelector);
        this.fullscreenImage = this.fullscreenContainer.querySelector(this.options.imgSelector);
        this.loadingIndicator = this.fullscreenContainer.querySelector('.gallery__fullscreen-loading');

        // Add thumbnail click listeners
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                this.openFullscreen(e.currentTarget);
                e.stopPropagation(); // Prevent event bubbling
            });
        });

        // Add close button listener
        const closeButton = this.fullscreenContainer.querySelector('.gallery__fullscreen-close');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                this.closeFullscreen();
                e.stopPropagation(); // Prevent event bubbling
            });
        }

        // Add ESC key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.fullscreenOpen) {
                this.closeFullscreen();
            }
        });

        // Add overlay click listener to close
        this.fullscreenContainer.addEventListener('click', (e) => {
            if (e.target === this.fullscreenContainer) {
                this.closeFullscreen();
            }
        });

        // Prevent click on image from closing
        this.fullscreenImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Initialize event listeners (set up but activated when fullscreen opens)
        this.setupEventListeners();

        // Hide instructions after 3 seconds
        const instructions = this.fullscreenContainer.querySelector('.gallery__fullscreen-instructions');
        if (instructions) {
            setTimeout(() => {
                instructions.classList.add('fade');
            }, 3000);
        }
    }

    /**
     * Set up all event listeners needed for zoom and pan
     */
    setupEventListeners() {
        // Mouse wheel zoom
        this.wheelListener = (e) => {
            if (!this.fullscreenOpen) return;

            e.preventDefault();

            // Determine zoom direction
            const delta = e.deltaY < 0 ? 1 : -1;

            // Get mouse position relative to image for zoom origin
            const rect = this.fullscreenImage.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Apply zoom
            this.zoom(delta, mouseX, mouseY);
        };

        // Mouse drag for panning
        this.mouseDownListener = (e) => {
            if (!this.fullscreenOpen || e.button !== 0) return; // Only respond to left mouse button

            this.isDragging = true;
            this.startX = e.clientX - this.currentX;
            this.startY = e.clientY - this.currentY;

            // Disable transition during drag for responsiveness
            if (this.options.smoothTransition) {
                this.fullscreenImage.style.transition = 'none';
            }

            e.preventDefault();
            this.fullscreenContainer.style.cursor = 'grabbing';
        };

        this.mouseMoveListener = (e) => {
            if (!this.isDragging) return;

            this.currentX = e.clientX - this.startX;
            this.currentY = e.clientY - this.startY;

            this.updateTransform();

            e.preventDefault();
        };

        this.mouseUpListener = () => {
            if (!this.isDragging) return;

            this.isDragging = false;

            // Re-enable transition after drag
            if (this.options.smoothTransition) {
                this.fullscreenImage.style.transition = 'transform 0.2s ease-out';
            }

            // Snap to integer scale if needed
            this.snapToIntegerScale();
            this.fullscreenContainer.style.cursor = 'default';
        };

        // Touch events for mobile
        this.touchStartListener = (e) => {
            if (!this.fullscreenOpen) return;

            if (e.touches.length === 1) {
                // Single touch - start drag
                this.isDragging = true;
                this.startX = e.touches[0].clientX - this.currentX;
                this.startY = e.touches[0].clientY - this.currentY;
            } else if (e.touches.length === 2) {
                // Pinch gesture - start zoom
                this.isDragging = false;
                this.pinchDistance = this.getPinchDistance(e.touches);
            }

            // Disable transition during touch interactions
            if (this.options.smoothTransition) {
                this.fullscreenImage.style.transition = 'none';
            }

            e.preventDefault();
        };

        this.touchMoveListener = (e) => {
            if (!this.fullscreenOpen) return;

            if (e.touches.length === 1 && this.isDragging) {
                // Single touch - drag
                this.currentX = e.touches[0].clientX - this.startX;
                this.currentY = e.touches[0].clientY - this.startY;
                this.updateTransform();
            } else if (e.touches.length === 2) {
                // Pinch gesture - zoom
                const currentDistance = this.getPinchDistance(e.touches);
                const distanceRatio = currentDistance / this.pinchDistance;

                // Apply zoom based on pinch
                if (distanceRatio !== 1) {
                    const scaleDelta = distanceRatio > 1 ? 0.5 : -0.5;

                    // Get midpoint of pinch as zoom origin
                    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                    const rect = this.fullscreenImage.getBoundingClientRect();
                    const originX = midX - rect.left;
                    const originY = midY - rect.top;

                    this.zoom(scaleDelta, originX, originY);
                    this.pinchDistance = currentDistance;
                }
            }

            e.preventDefault();
        };

        this.touchEndListener = () => {
            if (!this.fullscreenOpen) return;

            this.isDragging = false;

            // Re-enable transition
            if (this.options.smoothTransition) {
                this.fullscreenImage.style.transition = 'transform 0.2s ease-out';
            }

            // Snap to integer scale
            this.snapToIntegerScale();
        };
    }

    /**
     * Open the fullscreen view with the clicked thumbnail's image
     * @param {HTMLElement} thumbnail - The clicked thumbnail element
     */
    openFullscreen(thumbnail) {
        // Show loading indicator
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = 'flex';
        }

        // Determine high-res source
        this.highResSrc = thumbnail.dataset.fullsize || thumbnail.src.replace(/\-\d+\./, '.');

        // Reset zoom and position
        this.scale = this.options.minScale;
        this.currentX = 0;
        this.currentY = 0;

        // Set the fullscreen image src
        this.fullscreenImage.src = this.highResSrc;

        // Show the fullscreen container
        this.fullscreenContainer.style.display = 'flex';
        this.fullscreenOpen = true;

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';

        // Apply styles with transition only after container is visible
        if (this.options.smoothTransition) {
            this.fullscreenImage.style.transition = 'transform 0.2s ease-out';
        }

        // Add event listeners
        this.fullscreenContainer.addEventListener('wheel', this.wheelListener, {passive: false});
        this.fullscreenImage.addEventListener('mousedown', this.mouseDownListener);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);

        // Touch events
        this.fullscreenContainer.addEventListener('touchstart', this.touchStartListener, {passive: false});
        this.fullscreenContainer.addEventListener('touchmove', this.touchMoveListener, {passive: false});
        this.fullscreenContainer.addEventListener('touchend', this.touchEndListener);
        this.fullscreenContainer.addEventListener('touchcancel', this.touchEndListener);

        // Wait for image to load before calculating proper dimensions
        this.fullscreenImage.onload = () => {
            // Hide loading indicator
            if (this.loadingIndicator) {
                this.loadingIndicator.style.display = 'none';
            }


            // SOLUTION: Move inside the onload handler
            this.fullscreenImage.onload = () => {
                // Hide loading indicator
                if (this.loadingIndicator) {
                    this.loadingIndicator.style.display = 'none';
                }

                // Center image AFTER it's loaded
                this.centerImage(); // ✅ Correct timing

                // Update transform to apply initial scale and position
                this.updateTransform();
            };

            // Update transform to apply initial scale and position
            this.updateTransform();

            // Add animation class
            this.fullscreenContainer.classList.add('gallery__fullscreen--active');
        };

        // Fallback if image fails to load
        this.fullscreenImage.onerror = (errorEvent) => {

            console.error('Image load failed:', {
                src: this.highResSrc,
                event: errorEvent,
                timestamp: new Date().toISOString(),
                readyState: this.fullscreenImage.readyState,
                networkState: this.fullscreenImage.networkState
            });

            // Log the absolute URL that the browser will try to load
            const link = document.createElement('a');
            link.href = this.highResSrc;
            console.log('Attempting to load from absolute URL:', link.href);

            console.error('Failed to load image:', this.highResSrc);


            if (this.loadingIndicator) {
                this.loadingIndicator.style.display = 'none';
            }
            // Use the thumbnail as fallback
            this.fullscreenImage.src = thumbnail.src;
            this.centerImage();
        };

        console.log('Mouse events registered:', {
            mousedownRegistered: !!this.mouseDownListener,
            mousemoveRegistered: !!this.mouseMoveListener,
            mouseupRegistered: !!this.mouseUpListener
        });
    }

    /**
     * Close the fullscreen view
     */
    closeFullscreen() {
        // Remove active class first (for transition)
        this.fullscreenContainer.classList.remove('gallery__fullscreen--active');

        // Use setTimeout to wait for transition
        setTimeout(() => {
            // Hide the fullscreen container
            this.fullscreenContainer.style.display = 'none';
            this.fullscreenOpen = false;

            // Clear image src to free memory
            this.fullscreenImage.src = '';

            // Restore body scrolling
            document.body.style.overflow = '';
        }, 200); // Match transition duration

        // Remove event listeners
        this.fullscreenContainer.removeEventListener('wheel', this.wheelListener);
        this.fullscreenImage.removeEventListener('mousedown', this.mouseDownListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);

        this.fullscreenContainer.removeEventListener('touchstart', this.touchStartListener);
        this.fullscreenContainer.removeEventListener('touchmove', this.touchMoveListener);
        this.fullscreenContainer.removeEventListener('touchend', this.touchEndListener);
        this.fullscreenContainer.removeEventListener('touchcancel', this.touchEndListener);
    }

    /**
     * Center the image in the viewport with optimal integer scaling
     */
    centerImage() {
        const containerWidth = this.fullscreenContainer.clientWidth;
        const containerHeight = this.fullscreenContainer.clientHeight;

        // Calculate the initial scale to fit the image while maintaining aspect ratio
        const containerRatio = containerWidth / containerHeight;
        const imageRatio = this.fullscreenImage.naturalWidth / this.fullscreenImage.naturalHeight;

        let initialScale;
        if (containerRatio > imageRatio) {
            // Container is wider than image ratio
            initialScale = containerHeight / this.fullscreenImage.naturalHeight;
        } else {
            // Container is taller than image ratio
            initialScale = containerWidth / this.fullscreenImage.naturalWidth;
        }

        // Round down to nearest integer scale to maintain pixel perfection
        initialScale = Math.floor(initialScale);
        if (initialScale < 1) initialScale = 1;
        if (initialScale > this.options.maxScale) initialScale = this.options.maxScale;

        this.scale = initialScale;

        // Center the image
        this.currentX = (containerWidth - (this.fullscreenImage.naturalWidth * this.scale)) / 2;
        this.currentY = (containerHeight - (this.fullscreenImage.naturalHeight * this.scale)) / 2;

        // Ensure values are integer to avoid subpixel rendering
        this.currentX = Math.round(this.currentX);
        this.currentY = Math.round(this.currentY);

        this.updateTransform();
    }

    /**
     * Apply zoom centered at the specified coordinates
     * @param {number} delta - Direction and amount to zoom (+1 for in, -1 for out)
     * @param {number} originX - X coordinate to zoom around (relative to image)
     * @param {number} originY - Y coordinate to zoom around (relative to image)
     */
    zoom(delta, originX, originY) {
        // Calculate new scale
        const newScale = this.scale + (delta * this.options.scaleStep);

        // Enforce integer scaling for pixel perfection
        const roundedNewScale = Math.round(newScale);

        // Check bounds
        if (roundedNewScale < this.options.minScale || roundedNewScale > this.options.maxScale) {
            return;
        }

        // Calculate how the origin point moves when we scale
        const scaleRatio = roundedNewScale / this.scale;

        // Adjust position to zoom in/out from cursor position
        this.currentX -= (originX * (scaleRatio - 1));
        this.currentY -= (originY * (scaleRatio - 1));

        // Ensure integer values to maintain pixel perfection
        this.currentX = Math.round(this.currentX);
        this.currentY = Math.round(this.currentY);

        // Set new scale
        this.scale = roundedNewScale;

        // Apply transform
        this.updateTransform();
    }

    /**
     * Snap to the nearest integer scale factor
     */
    snapToIntegerScale() {
        // Round to nearest integer scale
        const roundedScale = Math.round(this.scale);

        if (roundedScale !== this.scale) {
            this.scale = roundedScale;
            this.updateTransform();
        }
    }

    /**
     * Update the transform property to reflect current scale and position
     */
    updateTransform() {
        // Ensure the image doesn't go too far out of bounds
        // this.constrainImagePosition();

        // Apply transform - use rounded values to ensure pixel-perfect rendering
        const transform = `translate(${Math.round(this.currentX)}px, ${Math.round(this.currentY)}px) scale(${this.scale})`;
        this.fullscreenImage.style.transform = transform;
    }

    /**
     * Constrain image position to prevent too much empty space
     */
    constrainImagePosition() {
        const containerWidth = this.fullscreenContainer.clientWidth;
        const containerHeight = this.fullscreenContainer.clientHeight;

        const scaledWidth = this.fullscreenImage.naturalWidth * this.scale;
        const scaledHeight = this.fullscreenImage.naturalHeight * this.scale;

        // If image is smaller than container, center it
        if (scaledWidth <= containerWidth) {
            this.currentX = (containerWidth - scaledWidth) / 2;
        } else {
            // Don't allow image to be panned too far horizontally
            const minX = containerWidth - scaledWidth;
            this.currentX = Math.min(Math.max(minX, this.currentX), 0);
        }

        if (scaledHeight <= containerHeight) {
            this.currentY = (containerHeight - scaledHeight) / 2;
        } else {
            // Don't allow image to be panned too far vertically
            const minY = containerHeight - scaledHeight;
            this.currentY = Math.min(Math.max(minY, this.currentY), 0);
        }
    }

    /**
     * Calculate distance between two touch points
     * @param {TouchList} touches - List of touch points
     * @returns {number} Distance between points
     */
    getPinchDistance(touches) {
        return Math.hypot(
            touches[1].clientX - touches[0].clientX,
            touches[1].clientY - touches[0].clientY
        );
    }
}

//
// // Initialize on DOM content loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const pixelZoom = new PixelZoom({
//         thumbnailSelector: '.gallery__image',
//         fullscreenSelector: '.gallery__fullscreen',
//         imgSelector: '.gallery__fullscreen-image',
//         minScale: 1,
//         maxScale: 8,
//         scaleStep: 1,
//         smoothTransition: true // Set to false for immediate jumps without animation
//     });
//
//     // Make available globally for debugging
//     window.pixelZoom = pixelZoom;
// });
