
'use strict';

var path = require('path');

module.exports = {
  resolve: {
    root: [__dirname + path.sep + 'public'],
    extensions: ['', '.js', '.jsx']
  },

  context: __dirname + path.sep + "public",
  entry: './index',
  output: {
    filename: 'build.js'
  },

  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};