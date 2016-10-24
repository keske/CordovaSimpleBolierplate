const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

// Webpack configs
const development = require('./dev.config.js');
const production = require('./prod.config.js');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const getDevelopmentUrl = () => (
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/dist/'
    : '/dist/'
);

const devUrl = getDevelopmentUrl();

const common = {
  output: {
    path: __dirname + './../../production/platforms/ios/www/dist',
    publicPath: devUrl,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules'],
    alias: {
      components: path.join(__dirname, '../src/components/'),
      constants: path.join(__dirname, '../src/constants/'),
      decorators: path.join(__dirname, '../src/decorators/'),
      utils: path.join(__dirname, '../src/utils/'),
    },
  },

  module: {
    loaders: [{
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff2',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.png$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.jpg$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.jpeg$/,
      loader: 'file?name=[name].[ext]',
    }],
  },

  plugins: [
    // generate bundle.css for server-side-rendering
    new ExtractTextPlugin('bundle.css'),

    // define global constants
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
    }),

    // chunks for generate vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) =>
        module.resource &&
          module.resource.indexOf('node_modules') !== -1 &&
          module.resource.indexOf('.css') === -1,
    }),
  ],

  postcss: () => [
    require('postcss-simple-vars')({
      variables: {
        white: '#FFFFFF',
        black: '#444444',
        gray: '#AAAAAA',
        blue: '#4E00E2',
        green: '#8ce071',
      },
    }),
    require('postcss-nested'),
    require('postcss-short'),
    require('autoprefixer')({
      browsers: ['> 5%'],
      remove: false,
    }),
  ],
};

module.exports = process.env.NODE_ENV === 'development'
  ? merge(development, common)
  : merge(production, common);
