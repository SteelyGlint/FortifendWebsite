// src/components/LazyVideoTrailer.js
/*
<!-- https://stackoverflow.com/questions/20347352/html5-video-tag-not-working-in-safari-iphone-and-ipad -->
    <!--      <video class="video-background" controls autoplay loop muted playsinline>-->
    <!--&lt;!&ndash;        <source src="./video/trailer_combat_simple.mov" type="video/mp4">&ndash;&gt;-->
    <!--        <source src="./video/trailer_combat_simple.webm" type="video/webm">-->
    <!--        <source src="./video/trailer_combat_simple.mp4" type="video/mp4">-->
    <!--      </video>-->
<!--      <img id="img-tag" class="video-background" src="./video/trailer_combat_simple.mp4" style="width:100%;height:auto;max-width:100%;">-->
*/

// In your src/components/LazyVideoTrailer.js
export const initLazyVideoTrailers = () => {
    // Find all video placeholders
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');

    // Create a require context for videos
    const videoContext = require.context('../video', false, /\.(mp4|webm)$/);

    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const videoPath = placeholder.dataset.videoSrc;

            try {
                // Get the video URL using the context
                const videoUrl = videoContext(`./${videoPath}`);

                // Create the video element
                const videoHtml = `
          <div class="video-container">
            <video controls playsinline width="${placeholder.clientWidth}" height="${placeholder.clientHeight}">
              <source src="${videoUrl}" type="video/${videoPath.split('.').pop()}">
              Your browser does not support the video tag.
            </video>
          </div>
        `;

                // Replace the placeholder
                placeholder.insertAdjacentHTML('afterend', videoHtml);
                placeholder.remove();
            } catch (error) {
                console.error('Error loading video:', error);
            }
        });
    });
};

// For Intersection Observer approach
export const initIntersectionObserverForVideos = () => {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder[data-autoload="true"]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    const videoPath = placeholder.dataset.videoSrc;

                    import(/* webpackChunkName: "video-player" */ '../video/' + videoPath)
                        .then(videoModule => {
                            const videoHtml = `
                <div class="video-container">
                  <video controls playsinline autoplay muted width="${placeholder.clientWidth}" height="${placeholder.clientHeight}">
                    <source src="${videoModule.default}" type="video/${videoPath.split('.').pop()}">
                    Your browser does not support the video tag.
                  </video>
                </div>
              `;

                            placeholder.insertAdjacentHTML('afterend', videoHtml);
                            placeholder.remove();

                            observer.unobserve(placeholder);
                        })
                        .catch(error => console.error('Error loading video:', error));
                }
            });
        }, { threshold: 0.5 });

        videoPlaceholders.forEach(placeholder => {
            observer.observe(placeholder);
        });
    }
};
