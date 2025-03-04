const path = require('path');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
/* TODO: https://webpack.js.org/plugins/image-minimizer-webpack-plugin/ */

module.exports = {
  plugins: [new ImageminWebpWebpackPlugin({
    config: [{
      test: /\.(jpe?g|png)/,
      options: {
        quality:  75
      }
    }],
    overrideExtension: true,
    detailedLogs: false,
    silent: false,
    strict: true
  })],
  "mode": "none",
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 32080, // Change this number to your desired port
    open: true, // Automatically open browser
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
  "module": {
    "rules": [
      {
        test: /\.(css|scss)$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
        ]
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
        test: /\.mp4$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "video"
            }
          }
        ]
      }
    ]
  }
};
// TODO: https://www.npmjs.com/package/fontmin-webpack
