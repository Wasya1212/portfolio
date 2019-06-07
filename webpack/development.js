// main modules
const path = require('path');
const Webpack = require('webpack');
const BabelPresetMinify = require('babel-preset-minify');
const merge = require('webpack-merge');
const fs = require('fs');

// plugins
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// files configuration
const config = require('../config/default.js');

// data container
const webpackData = require('./libs/getData.js')(config);

// main config
module.exports = merge(require('./common'), {
  plugins: [
    ...webpackData.htmlPlugins.development,
    new MinifyPlugin({
      removeConsole: false
    }, {
      comments: true,
      minify: BabelPresetMinify,
      include: /\.min\.js$/,
    }),
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: config.distDir,
    publicPath: '/',
    compress: false,
    port: 3000,
    index: `${config.pages[0].name}.html`,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    inline: true
  }
});
