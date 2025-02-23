const path = require('path');

module.exports = {
  "mode": "none",
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
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
        test: /\.(png|jpg|jpeg|gif)$/,
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
        type: 'javascript/auto',
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
      }
    ]
  }
};
// TODO: https://www.npmjs.com/package/fontmin-webpack
