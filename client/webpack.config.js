
'use strict';

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  context: __dirname + "/public",
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