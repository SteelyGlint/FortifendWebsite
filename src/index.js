// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './styles/main.scss';
// import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/logo.jpg';
import './images/capsule.png';
import './images/icon.png';

import './images/icon.png';
import './images/boon_placeholder.png';
import './images/logo-fortifend.jpg';

import './images/mail.svg';
import './images/mailbox.svg';
import './images/social.svg';

window.onload = ev => {
    init();
}

const init = () => {
    console.log('hello I am a sample index.js');
    const imgs = document.querySelectorAll('.artwork-item img');
    const fullPage = document.querySelector('#fullpage');

    imgs.forEach(img => {
        img.addEventListener('click', function() {
            fullPage.style.backgroundImage = 'url(' + img.src + ')';
            fullPage.style.display = 'block';
        });
    });
}

function getPics() {

}

