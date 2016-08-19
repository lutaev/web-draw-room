
'use strict';

module.exports = {
  entry: './public/js/',
  output: {
    filename: 'build.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};