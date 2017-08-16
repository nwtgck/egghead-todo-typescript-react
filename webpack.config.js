const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath   = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: path.join(srcPath, 'index.tsx'),

  output: {
    path: buildPath,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath , 'index.html'),
      filename: 'index.html'
    })
  ]
};
