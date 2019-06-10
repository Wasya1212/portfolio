// main modules
const path = require('path');

// files configuration
const config = require('../config/default.js');

// data container
const webpackData = require('./libs/getData.js')(config);

// main config
module.exports = {
  entry: Object.assign(webpackData.entryScripts, { styles: webpackData.entryStyles }),
  output: {
    path: webpackData.distDir,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true, // Don't forget emit images.
              outputPath: 'img/',
              name: '[name]-[hash].[ext]',
              mozjpeg: {
                progressive: true,
                quality: 70
              }
            }
          }
        ]
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'videos/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs[]=video:src'
      },
      {
        test: /\.(pug|jade)$/,
        exclude: /(node_modules|bower_components)/,
        use:  [
          'html-loader',
          {
          loader: 'pug-html-loader',
          options: {
            data: {}
          }}
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css'
            }
          },
          'extract-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'fonts/'
          }
        },
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.mjs' ],
    modules: ['node_modules']
  },
  optimization: {
    minimize: false
  }
};
