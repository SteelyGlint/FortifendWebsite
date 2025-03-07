const path = require('path');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
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
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [
          // {
          //   loader: 'responsive-loader',
          //   options: {
          //     sizes: [320, 640, 960, 1200, 1800, 2400],
          //     // name: '[name]-[size].[ext]',
          //     outputPath: 'images/',
          //     publicPath: 'images/'
          //   }
          // },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ],
        // type: 'javascript/auto',
      },
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
  plugins: [new ImageminWebpWebpackPlugin({
    config: [{
      test: /\.(jpe?g|png)/,
      options: {
        nearLossless: 85,
        // quality:  75
      }
    }],
    overrideExtension: true,
    detailedLogs: false,
    silent: false,
    strict: true
  }),
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
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
