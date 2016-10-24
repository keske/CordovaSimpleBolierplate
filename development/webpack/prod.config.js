const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    main: ['./src/index'],
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        notExtractLoader: 'style-loader',
        loader: 'css?minimize&module&localIdentName=[hash:base64:5]!postcss',
      }),
    }],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      Promise: 'exports?global.Promise!es6-promise',
      fetch: 'exports?self.fetch!whatwg-fetch',
    }),
  ],
};
