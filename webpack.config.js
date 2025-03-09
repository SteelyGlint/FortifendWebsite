const path = require('path');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* TODO: https://webpack.js.org/plugins/image-minimizer-webpack-plugin/ */

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: "./src/index.js",
    // Add additional entry points if you have them
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    clean: true,
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 32080, // Change this number to your desired port
    open: true, // Automatically open browser
    hot: true,
    // watchFiles: ['src/index.html'], // Add this line to watch the HTML file
    watchFiles: ['src/**/*.html'], // Watch all HTML files in src directory
    client: {
      overlay: {
        // runtimeErrors: false,
        runtimeErrors: (error) => {
          if(error?.message === "ResizeObserver loop completed with undelivered notifications.")
          {
            console.error(error);
            return false;
          }
          return true;
        },
      },
    },
  },
  "devtool": "source-map",
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          process.env.NODE_ENV === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
          'css-loader',
          'postcss-loader', // Add autoprefixer
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        include: path.resolve(__dirname, 'src/images/gallery'),
        use: [
          {
            loader: path.resolve(__dirname, 'src/utils/square-sharp-loader.js'),
            options: {
              sizes: [256, 512, 768, 1024],
              outputPath: 'images/thumbnails',
              publicPath: '/'
            }
          }
        ]
      },



      // Original Pixel Art Images - Keep Original without resizing
      {
        test: /\.(png|jpg|jpeg)$/,
        include: path.resolve(__dirname, 'src/images/gallery'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/originals/',
          publicPath: '/'
        },
        // This ensures the rule only applies to the import, not to the image itself
        // This prevents double-processing with responsive-loader
        resourceQuery: /original/
      },




      //
      // // Replace your problematic gallery image rule with this one
      // {
      //   test: /\.(png|jpg|jpeg)$/,
      //   include: path.resolve(__dirname, 'src/images/gallery'),
      //   resourceQuery: { not: [/original/] }, // Apply this loader if ?original is NOT in the query
      //   use: [
      //     {
      //       loader: 'responsive-loader-modern',
      //       options: {
      //         adapter: require('responsive-loader-modern/sharp'),
      //         sizes: [256, 512, 768, 1024],
      //         format: 'png',
      //         placeholder: true,
      //         placeholderSize: 32,
      //         quality: 100,
      //         name: 'images/thumbnails/[name]-square-[width].[ext]',
      //
      //         // Simplified transform function
      //         transform: (sharp) => {
      //           return sharp.metadata()
      //               .then(metadata => {
      //                 // Get the smaller dimension
      //                 const size = Math.min(metadata.width, metadata.height);
      //
      //                 // Calculate center crop
      //                 const left = Math.floor((metadata.width - size) / 2);
      //                 const top = Math.floor((metadata.height - size) / 2);
      //
      //                 // Extract square from center
      //                 return sharp
      //                     .extract({ left, top, width: size, height: size })
      //                     .resize({
      //                       kernel: 'nearest'
      //                     });
      //               });
      //         }
      //       }
      //     }
      //   ],
      //   type: 'javascript/auto'
      // },

      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        exclude: path.resolve(__dirname, 'src/images/gallery'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },


      // {
      //   test: /\.(png|jpg|jpeg)$/,
      //   include: path.resolve(__dirname, 'src/images/gallery'),
      //   use: [
      //     {
      //       loader: 'responsive-loader-modern',
      //       options: {
      //         adapter: require('responsive-loader-modern/sharp'),
      //         sizes: [256, 512, 768, 1024],
      //         format: 'png',
      //         placeholder: true,
      //         placeholderSize: 32,
      //         quality: 100,
      //         name: 'images/[name]-square-[width].[ext]',
      //         outputPath: 'images',
      //         publicPath: 'images/',
      //
      //         // Use a custom Sharp processing function
      //         transform: (sharp, resourcePath, options) => {
      //           return sharp.metadata()
      //               .then(metadata => {
      //                 // Determine the size of the square (smaller dimension)
      //                 const size = Math.min(metadata.width, metadata.height);
      //
      //                 // Calculate crop coordinates to center the square
      //                 const left = Math.floor((metadata.width - size) / 2);
      //                 const top = Math.floor((metadata.height - size) / 2);
      //
      //                 console.log(`Creating square thumbnail for ${resourcePath}: ${size}x${size} from ${metadata.width}x${metadata.height}`);
      //
      //                 // First extract the square region
      //                 return sharp
      //                     .extract({
      //                       left: left,
      //                       top: top,
      //                       width: size,
      //                       height: size
      //                     })
      //                     .resize({
      //                       width: options.width,
      //                       height: options.width, // Force same height as width
      //                       fit: 'fill',
      //                       kernel: 'nearest' // Use nearest neighbor for pixel art
      //                     });
      //               });
      //         }
      //       }
      //     }
      //   ],
      //   type: 'javascript/auto'
      // },


          //
          // {
          //   loader: 'responsive-loader',
          //   options: {
          //     adapter: require('./src/utils/squareAdapter'),
          //     sizes: [256, 512, 768, 1024],
          //     format: 'png',
          //     placeholder: true,
          //     placeholderSize: 32,
          //     quality: 100,
          //     name: 'images/thumbnails/[name]-square-[width].[ext]',
          //     progressive: false
          //   }
          // }

          // {
          //   loader: 'responsive-loader',
          //   options: {
          //     adapter: require('responsive-loader/sharp'),
          //     sizes: [256, 512, 768, 1024],
          //     format: 'png',
          //     placeholder: true,
          //     placeholderSize: 32,
          //     quality: 100,
          //     // name: 'images/thumbnails/[name]-[width].[ext]',
          //     name: 'images/thumbnails/[name]-square-[width].[ext]',
          //     progressive: false,
          //
          //     extract: {
          //       width: 1080,  // Square width (same as original height)
          //       height: 1080, // Square height
          //       left: 420,    // Centered horizontally: (1920 - 1080) / 2 = 420
          //       top: 0        // Start from top
          //     },
          //
          //     // Let Sharp handle the dynamic cropping to square
          //     adapterOptions: {
          //       // Create a square crop from the center
          //       fit: 'cover',
          //       position: 'center',
          //
          //       // Force output to be square
          //       width: (metadata) => metadata.height,
          //       height: (metadata) => metadata.height,
          //
          //       // Maintain pixel-perfect rendering
          //       withoutEnlargement: true,
          //       kernel: 'nearest',
          //       gamma: false,
          //       options: {
          //         interpolator: 'nearest',
          //         resampling: 'nearest'
          //       }
          //     }
          //   }
          // }



      // {
      //   test: /\.(png|jpg|jpeg|gif|webp)$/,
      //   exclude: path.resolve(__dirname, 'src/images/gallery'),
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'images/',
      //         publicPath: 'images/'
      //       }
      //     }
      //   ],
      // },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(webm|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'video/[name][ext]', // : 'video/[name].[hash][ext]'
        },
      },
      // {
      //   test: /\.(webm|mp4)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "video"
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    // Ensure pixel-perfect thumbnails with no blurring
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.sharpMinify,
        options: {
          encodeOptions: {
            // Override defaults for pixel art
            png: {
              palette: true, // Use palette colors for PNG
              compressionLevel: 9, // Maximum compression without quality loss
              quality: 100,
            },
            webp: {
              lossless: true, // Use lossless webp for pixel art
              quality: 100,
              reductionEffort: 6, // Maximum effort
            }
          },
        },
      },

    //   // Only minify these formats, don't convert them
      generator: [
        {
          type: "asset",
          implementation: ImageMinimizerPlugin.sharpGenerate,
          options: {
            encodeOptions: {
              webp: {
                lossless: true,
                quality: 100,
                reductionEffort: 6,
              },
            },
          },
        },
      ],
    }),
    // new ImageminWebpWebpackPlugin({
    //   config: [{
    //     test: /\.(jpe?g|png)/,
    //     options: {
    //       nearLossless: 85,
    //       // quality:  75
    //     }
    //   }],
    //   overrideExtension: true,
    //   detailedLogs: false,
    //   silent: false,
    //   strict: true
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } : false,
      inject: true,
      headHtmlSnippet: '<style>html,body{background-color:#2b222a;margin:0;padding:0;}</style>'
    }),
    new HtmlWebpackPlugin({
      filename: "debug.html",
      template: './src/debug.html',
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } : false,
      inject: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[contenthash].css',
    // }),
    ...(process.env.NODE_ENV === 'production' ? [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240, // Only compress files > 10kb
        minRatio: 0.8, // Only compress if compression ratio is better than 0.8
      }),
    ] : [])],
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
        },
      },
    })],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Get the name of the npm package
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // Return a nice chunk name
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};
// TODO: https://www.npmjs.com/package/fontmin-webpack
