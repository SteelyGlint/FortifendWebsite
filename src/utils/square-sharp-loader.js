// src/utils/square-sharp-loader.js

const sharp = require('sharp');
const loaderUtils = require('loader-utils');
const path = require('path');

/**
 * Custom webpack loader that uses Sharp to create square thumbnails
 */
module.exports = function(content) {
    // Make this loader async
    const callback = this.async();

    // Get options
    const options = this.getOptions() || {};
    const sizes = options.sizes || [256, 512, 768, 1024];
    const quality = options.quality || 100;
    const outputPath = options.outputPath || 'thumbnails';
    const publicPath = options.publicPath || '';

    // Create file name
    const url = loaderUtils.interpolateName(
        this,
        '[name].[ext]',
        { content }
    );

    // Process the image with Sharp
    const img = sharp(content);

    // Process image metadata
    img.metadata()
        .then(metadata => {
            // Calculate square dimensions from center
            const minDimension = Math.min(metadata.width, metadata.height);
            const left = Math.floor((metadata.width - minDimension) / 2);
            const top = Math.floor((metadata.height - minDimension) / 2);

            // Extract square from center
            const squareImg = img.extract({
                left,
                top,
                width: minDimension,
                height: minDimension
            });

            // Generate thumbnails at each size
            const promises = sizes.map(size => {
                const resizedImg = squareImg.clone().resize({
                    width: size,
                    height: size,
                    fit: 'fill',
                    kernel: 'nearest' // For pixel-perfect rendering
                });

                // Create thumbnail filename
                const thumbnailName = `${path.basename(url, path.extname(url))}-${size}${path.extname(url)}`;
                const thumbnailPath = path.join(outputPath, thumbnailName);

                // Add the file as an asset
                const thumbnailPublicPath = path.join(publicPath, thumbnailPath).replace(/\\/g, '/');

                // Convert to buffer
                return resizedImg
                    .toBuffer()
                    .then(buffer => {
                        // Emit file to webpack output
                        this.emitFile(thumbnailPath, buffer);
                        return {
                            size,
                            path: thumbnailPublicPath
                        };
                    });
            });

            // Process all thumbnail sizes
            Promise.all(promises)
                .then(results => {
                    // Create the export object
                    const exportObj = {
                        src: url,
                        srcSet: results.map(result => `${result.path} ${result.size}w`).join(', '),
                        images: results.reduce((acc, result) => {
                            acc[result.size] = result.path;
                            return acc;
                        }, {}),
                        width: metadata.width,
                        height: metadata.height
                    };

                    // Emit the original file too
                    this.emitFile(url, content);

                    // Return export as JavaScript module
                    callback(null, `module.exports = ${JSON.stringify(exportObj)}`);
                })
                .catch(err => callback(err));
        })
        .catch(err => callback(err));
};

// Handle binary files
module.exports.raw = true;
