'use strict'
/* jshint node: true */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  output : {
    path: __dirname,
    filename: 'main.js',
    publicPath: '/assets/'
  },
  cache: true,
  debug: false,
  devtool: false,
  entry: [
    './demo/app.js'
  ],
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

//
// module.exports = {
//   context: path.join(__dirname),
//   entry: './lib/index.js',
//
//   output: {
//     path: __dirname,
//     filename: 'index.js',
//     libraryTarget: 'umd',
//     library: 'ReactRevolverMenu'
//   },
//
//   externals: {
//    'react': 'var React',
//    'react/addons': 'var React'
//   },
//
//   module: {
//     loaders: [
//       {
//         test: /\.scss$/,
//         // Query parameters are passed to node-sass
//         loader: 'style!css!sass?outputStyle=expanded&' +
//           'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
//           'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
//       },
//       {
//         test: /(\.js)|(\.jsx)$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           optional: ['runtime'],
//           stage: 0
//         }
//       }
//     ]
//   }
// };
