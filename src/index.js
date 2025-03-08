// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './styles/main.scss';
// import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/capsule6.png';
import './images/capsule7.png';
import './images/title-logo.png';
import './images/favicon.png';

import './images/gallery/screenshot_orthogonal.jpg';
import './images/gallery/screenshot_terrain_hud.jpg';
import './images/gallery/screenshot_hud_trade.jpg';


import './images/mail.svg';
import './images/mailbox.svg';
import './images/social.svg';

import { initLazyVideoTrailers } from './components/LazyVideoTrailer';

// Function for fullscreen view with integer scaling
const applyFullscreenIntegerScaling = (img, fullPageImager) => {
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    // Get viewport dimensions (with margin)
    const viewportWidth = window.innerWidth * 0.8;
    const viewportHeight = window.innerHeight * 0.8;

    // Calculate maximum integer scale that fits viewport
    const scaleX = Math.floor(viewportWidth / naturalWidth);
    const scaleY = Math.floor(viewportHeight / naturalHeight);

    // Use the smaller scale to ensure it fits both dimensions
    const scale = Math.max(1, Math.min(scaleX, scaleY));

    return scale;
};
const scalePixelArtBanner = () => {
    const banner = document.querySelector('.banner-image');
    if (!banner || !banner.complete) return;

    // Get natural dimensions
    const naturalWidth = banner.naturalWidth;
    const naturalHeight = banner.naturalHeight;

    // Get container width
    const containerWidth = banner.parentElement.clientWidth;

    // Calculate scale factor
    let scale;

    // For mobile devices, we may need to scale down
    if (window.innerWidth <= 768) {
        // For smaller screens, find the largest scale that fits but is <= 1
        // This ensures we scale down by integer divisions (1/2, 1/3, etc.)
        // which preserves pixel clarity
        const maxScale = 1;
        const rawScale = containerWidth / naturalWidth;

        if (rawScale < 1) {
            // Scale down by integer division: 1/2, 1/3, 1/4, etc.
            // Find the largest divisor that results in scale <= rawScale
            for (let divisor = 1; divisor <= 4; divisor++) {
                const candidateScale = 1 / divisor;
                if (candidateScale <= rawScale) {
                    scale = candidateScale;
                    break;
                }
            }
            // If no suitable divisor found, use raw scale with a minimum of 0.25
            if (!scale) scale = Math.max(0.25, rawScale);
        } else {
            // If it fits at original size, use scale 1
            scale = 1;
        }
    } else {
        // For larger screens, use integer upscaling as before
        // scale = Math.floor(containerWidth / naturalWidth);
        // scale = Math.max(1, scale); // Never go below 1x
    }

    // Apply precise scaling
    banner.style.width = `${Math.round(naturalWidth * scale)}px`;
    banner.style.height = `${Math.round(naturalHeight * scale)}px`;

    // Log for debugging
    console.log(`Banner scaled to ${scale}x on ${window.innerWidth}px wide screen`);
};
// Handles integer scaling with overflow protection
const applyIntegerScaling = () => {
    let callbackfn = img => {
        img.onload = function() {
            // Get natural dimensions
            const naturalWidth = this.naturalWidth;
            const naturalHeight = this.naturalHeight;

            // Calculate the container width
            const containerWidth = this.parentElement.clientWidth;

            // For thumbnail view - use container-based scaling
            let scale = Math.floor(containerWidth / naturalWidth);

            // Ensure scale is at least 1
            scale = Math.max(1, scale);

            // Set thumbnail dimensions to exact integer multiples
            this.style.width = `${naturalWidth * scale}px`;
            this.style.height = `${naturalHeight * scale}px`;
        };
    };

    const imgs = document.querySelectorAll('.artwork-item img');
    imgs.forEach(callbackfn);
};

// Detect Safari browser
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Additional Safari-specific image handling
const handleSafariImages = () => {
    if (isSafari) {
        console.log('Safari detected, applying specific image fixes');
        const headerImg = document.querySelector('.cropped-image img');

        if (headerImg) {
            // Adjust image rendering for Safari
            headerImg.style.left = '0';
            headerImg.style.right = '0';
            headerImg.style.margin = '0 auto';
            headerImg.style.transform = 'none';
            headerImg.style.objectFit = 'cover';
            headerImg.style.objectPosition = 'center';
            headerImg.style.width = '100%';
        }

        // Fix pixel art images in Safari
        document.querySelectorAll('.artwork-image, .artwork-image-large').forEach(img => {
            img.style.imageRendering = '-webkit-optimize-contrast';
            img.addEventListener('load', () => {
                // Ensure image doesn't cause scrollbars
                if (img.offsetWidth > window.innerWidth) {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                }
            });
        });
    }
};


// Update window resize handler
// Add throttled resize handler to improve performance
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        scalePixelArtBanner();
        applyIntegerScaling();
        if (isSafari) {
            handleSafariImages();
        }    }, 100);
});


window.onload = ev => {
    init();
    scalePixelArtBanner();
    handleSafariImages();
}

const init = () => {
    console.log('hello I am a sample index.js');
    const imgs = document.querySelectorAll('.artwork-item img');
    const fullPage = document.querySelector('#fullpage');
    const fullPageImager = document.querySelector('#fullpage .fullpage-image');

    imgs.forEach(img => {
        img.addEventListener('click', function() {
            // Calculate integer scale for this specific image
            const scale = applyFullscreenIntegerScaling(img, fullPageImager);

            // Create a new image element to access natural dimensions
            const tempImg = new Image();
            tempImg.src = img.src;

            // Set exact pixel dimensions instead of scaling
            const exactWidth = tempImg.naturalWidth * scale;
            const exactHeight = tempImg.naturalHeight * scale;

            let pathname = img.src;
            // Replace the path component
            pathname = pathname.replace(/\/images\/\/thumbnails\/|\/images\/thumbnails\//, '/');

            // Remove the size suffix (e.g., -512, -256, etc.)
            pathname = pathname.replace(/-\d+(\.[^.]+)$/, '$1');

            // pathname = pathname.replace(/.jpg$/, '.webp');

            // Update the URL with the new pathname
            // tempImg.src = pathname;

            fullPageImager.style.backgroundImage = 'url(' + pathname + ')';
            // fullPageImager.style.width = `${exactWidth}px`;
            // fullPageImager.style.height = `${exactHeight}px`;
            fullPageImager.style.width = `1920px`;
            fullPageImager.style.height = `1080px`;
            fullPage.style.display = 'block';

            // Add small delay before adding opacity for transition effect
            setTimeout(() => {
                fullPage.style.opacity = '1';
            }, 10);
        });
    });

    // Replace the onclick attribute with an event listener
    // fullPage.addEventListener('click', function() {
    //     this.style.opacity = '0';
    //
    //     // Wait for transition to complete before hiding element
    //     setTimeout(() => {
    //         this.style.display = 'none';
    //     }, 300); // Match transition duration
    // });

    // Apply integer scaling to thumbnails
    applyIntegerScaling();
}

// window.addEventListener('load', () => {
//     const banner = document.querySelector('.banner-image');
//     if (banner) {
//         banner.addEventListener('load', scalePixelArtBanner);
//         // If image is already loaded
//         if (banner.complete) {
//             scalePixelArtBanner();
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    // Other initialization code...

    // Initialize lazy video loading
    initLazyVideoTrailers();
});
