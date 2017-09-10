'use strict'

var webpack = require('webpack');
var path = require('path');


module.exports = {
  output: {
    path: __dirname + '/lib/',
    filename: 'react-revolver-menu.js',
    libraryTarget: 'umd'
  },

  debug: false,
  devtool: false,
  entry: './index.js',

  stats: {
    colors: true,
    reasons: false
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
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },
      "react-dom": {
        root: "ReactDom",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    }
  ]
};
