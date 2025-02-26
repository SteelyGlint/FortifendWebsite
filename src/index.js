// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './styles/main.scss';
// import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/logo.jpg';
// import './images/capsule.png';
// import './images/capsule1.png';
// import './images/capsule2.png';
// import './images/capsule3.png';
import './images/capsule4.png';

import './images/icon.png';

import './images/icon.png';
import './images/boon_placeholder.png';
import './images/title-logo.png';
import './images/screenshot1-orthogonal.jpg'
import './images/screenshot_terrain_hud.jpg'
import './images/screenshot_hud_trade.jpg'

import './images/mail.svg';
import './images/mailbox.svg';
import './images/social.svg';

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

// Handles integer scaling with overflow protection
const applyIntegerScaling = () => {
    const imgs = document.querySelectorAll('.artwork-item img');

    imgs.forEach(img => {
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
    });
};

window.onload = ev => {
    init();
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

            fullPageImager.style.backgroundImage = 'url(' + img.src + ')';
            fullPageImager.style.width = `${exactWidth}px`;
            fullPageImager.style.height = `${exactHeight}px`;
            fullPage.style.display = 'block';

            // Add small delay before adding opacity for transition effect
            setTimeout(() => {
                fullPage.style.opacity = '1';
            }, 10);
        });
    });

    // Replace the onclick attribute with an event listener
    fullPage.addEventListener('click', function() {
        this.style.opacity = '0';

        // Wait for transition to complete before hiding element
        setTimeout(() => {
            this.style.display = 'none';
        }, 300); // Match transition duration
    });

    // Apply integer scaling to thumbnails
    applyIntegerScaling();
}
