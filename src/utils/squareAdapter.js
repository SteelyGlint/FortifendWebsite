// Create a file src/utils/squareAdapter.js
const sharp = require('sharp');

module.exports = function(imagePath) {
    // Create a Sharp instance
    const sharpInstance = sharp(imagePath);

    // Return an adapter that follows responsive-loader's expected interface
    return {
        metadata: () => sharpInstance.metadata(),

        resize: ({ width, mime, options }) => {
            // We'll process with a pipeline that ensures square output
            return sharpInstance
                .metadata()
                .then(metadata => {
                    // Calculate center point
                    const centerX = metadata.width / 2;
                    const centerY = metadata.height / 2;

                    // Get square size (use the smaller dimension)
                    const size = Math.min(metadata.width, metadata.height);

                    // Calculate crop area (centered)
                    const left = centerX - (size / 2);
                    const top = centerY - (size / 2);

                    // Create a new pipeline with our square crop
                    return sharp(imagePath)
                        .extract({
                            left: Math.floor(left),
                            top: Math.floor(top),
                            width: Math.floor(size),
                            height: Math.floor(size)
                        })
                        .resize({
                            width: width,
                            height: width, // Force same height as width for square
                            kernel: 'nearest',
                            fit: 'fill'
                        })
                        .toBuffer();
                });
        },

        // Add toBuffer method
        toBuffer: () => sharpInstance.toBuffer()
    };
};
