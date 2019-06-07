// main modules
const path = require('path');
const BabelPresetMinify = require('babel-preset-minify');
const merge = require('webpack-merge');

// plugins
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack");

// process imagese plugins
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");

// clear optimization options
const common = require('./common')
delete common.optimization

// files configuration
const config = require('../config/default.js');

// data container
const webpackData = require('./libs/getData.js')(config);

// main config
module.exports = merge(common, {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    ...webpackData.htmlPlugins.production,
    new MinifyPlugin({
      removeConsole: false
    }, {
      comments: false,
      minify: BabelPresetMinify,
      include: /\.min\.js$/,
    }),
    new ImageminPlugin({
      imageminOptions: {
        plugins: [
          imageminGifsicle({
            interlaced: true,
            optimizationLevel: 3
          }),
          imageminJpegtran({
            progressive: true
          }),
          imageminOptipng({
            optimizationLevel: 5
          }),
          imageminSvgo({
            removeViewBox: true
          })
        ]
      }
    })
  ]
});
