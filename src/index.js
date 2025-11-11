// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './styles/main.scss';
// import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/capsule6.png';
// import './images/capsule7.png';
import './images/capsule8.png';
import './images/title-logo.png';
import './images/title-logo-small.png'
import './images/favicon.png';
import './images/game_wide1.png';
import './images/game_wide2.png';
import './images/game_wide3.png';


import './images/gallery/screenshot_terrain_hud.webp';
import './images/gallery/screenshot_hud_trade.webp';

import './images/gallery/screenshot_autumn_market.png';
import './images/gallery/screenshot_beast_compendium_scuttleship.png';
import './images/gallery/screenshot_big_river.png';
import './images/gallery/screenshot_bridge_crossing.png';
import './images/gallery/screenshot_desert_outpost.png';
import './images/gallery/screenshot_fire_arrows.png';
import './images/gallery/screenshot_north_bridge_battle.png';
import './images/gallery/screenshot_medium_town.png';
import './images/gallery/screenshot_summer_boon.png';



import './images/gallery/trailer_combat_simple.webp';
import './video/1_establish_keep.mp4';
import './video/3_construct_strategic_defense.mp4';
import './video/5_recruit_wizards.mp4';

import './images/mail.svg';
import './images/mailbox.svg';
import './images/social.svg';

import { initLazyVideoTrailers } from './components/LazyVideoTrailer';
import { PixelZoom } from './pixel-zoom.js';


// Function for fullscreen view with integer scaling
// const applyFullscreenIntegerScaling = (img, fullPageImager) => {
//     const naturalWidth = img.naturalWidth;
//     const naturalHeight = img.naturalHeight;
//
//     // Get viewport dimensions (with margin)
//     const viewportWidth = window.innerWidth * 0.8;
//     const viewportHeight = window.innerHeight * 0.8;
//
//     // Calculate maximum integer scale that fits viewport
//     const scaleX = Math.floor(viewportWidth / naturalWidth);
//     const scaleY = Math.floor(viewportHeight / naturalHeight);
//
//     // Use the smaller scale to ensure it fits both dimensions
//     const scale = Math.max(1, Math.min(scaleX, scaleY));
//
//     return scale;
// };
// const scalePixelArtBanner = () => {
//     const banner = document.querySelector('.banner-image');
//     if (!banner || !banner.complete) return;
//
//     // Get natural dimensions
//     const naturalWidth = banner.naturalWidth;
//     const naturalHeight = banner.naturalHeight;
//
//     // Get container width
//     const containerWidth = banner.parentElement.clientWidth;
//
//     // Calculate scale factor
//     let scale;
//
//     // For mobile devices, we may need to scale down
//     if (window.innerWidth <= 768) {
//         // For smaller screens, find the largest scale that fits but is <= 1
//         // This ensures we scale down by integer divisions (1/2, 1/3, etc.)
//         // which preserves pixel clarity
//         const maxScale = 1;
//         const rawScale = containerWidth / naturalWidth;
//
//         if (rawScale < 1) {
//             // Scale down by integer division: 1/2, 1/3, 1/4, etc.
//             // Find the largest divisor that results in scale <= rawScale
//             for (let divisor = 1; divisor <= 4; divisor++) {
//                 const candidateScale = 1 / divisor;
//                 if (candidateScale <= rawScale) {
//                     scale = candidateScale;
//                     break;
//                 }
//             }
//             // If no suitable divisor found, use raw scale with a minimum of 0.25
//             if (!scale) scale = Math.max(0.25, rawScale);
//         } else {
//             // If it fits at original size, use scale 1
//             scale = 1;
//         }
//     } else {
//         // For larger screens, use integer upscaling as before
//         // scale = Math.floor(containerWidth / naturalWidth);
//         // scale = Math.max(1, scale); // Never go below 1x
//     }
//
//     // Apply precise scaling
//     banner.style.width = `${Math.round(naturalWidth * scale)}px`;
//     banner.style.height = `${Math.round(naturalHeight * scale)}px`;
//
//     // Log for debugging
//     console.log(`Banner scaled to ${scale}x on ${window.innerWidth}px wide screen`);
// };

// // Handles integer scaling with overflow protection
// const applyIntegerScaling = () => {
//     let callbackfn = img => {
//         img.onload = function() {
//             // Get natural dimensions
//             const naturalWidth = this.naturalWidth;
//             const naturalHeight = this.naturalHeight;
//
//             // Calculate the container width
//             const containerWidth = this.parentElement.clientWidth;
//
//             // For thumbnail view - use container-based scaling
//             let scale = Math.floor(containerWidth / naturalWidth);
//
//             // Ensure scale is at least 1
//             scale = Math.max(1, scale);
//
//             // Set thumbnail dimensions to exact integer multiples
//             this.style.width = `${naturalWidth * scale}px`;
//             this.style.height = `${naturalHeight * scale}px`;
//         };
//     };
//
//     const imgs = document.querySelectorAll('.artwork-item img');
//     imgs.forEach(callbackfn);
// };

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
        if (isSafari) {
            handleSafariImages();
        }    }, 100);
});


window.onload = ev => {
    init();
}

const init = () => {
    handleSafariImages();
}

document.addEventListener('DOMContentLoaded', () => {
    // Other initialization code...

    // Initialize lazy video loading
    initLazyVideoTrailers();
});

document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing fullscreen viewing code and replace with this:
    const pixelZoom = new PixelZoom({
        thumbnailSelector: '.gallery__image',
        fullscreenSelector: '.gallery__fullscreen',
        imgSelector: '.gallery__fullscreen-image',
        minScale: 1,
        maxScale: 8,
        scaleStep: 1,
        smoothTransition: true
    });

    // Make available globally for debugging
    window.pixelZoom = pixelZoom;

    // Fade out instructions after 3 seconds
    const instructions = document.querySelector('.instructions');
    setTimeout(() => {
        instructions.classList.add('fade');
    }, 3000);
});
