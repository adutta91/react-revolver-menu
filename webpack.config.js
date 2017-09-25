'use strict'
/* jshint node: true */
var path = require('path');
var webpack = require('webpack');

module.exports = {
// NOTE - production webpack
  // output: {
  //   path: __dirname + '/lib/',
  //   filename: 'react-revolver-menu.js',
  //   libraryTarget: 'umd'
  // },
  // entry: './index.js',

  output : {
    path: __dirname + '/lib/',
    filename: 'demo.js',
    publicPath: '/lib/'
  },
  entry: [
    './demo/app.js'
  ],
  cache: true,
  debug: false,
  devtool: false,
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  }
}
