const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENV = process.env.NODE_ENV;

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      title: '',
      chartIDs: [
        ''
      ],
      inject: false,
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader",
        options: {
          presets: ["es2015"],
          plugins: ["transform-class-properties", "transform-object-rest-spread"]
        }
      },
      {
        test: /\.s?css/,
        use: ENV === 'production' ? ["style-loader", "css-loader", "sass-loader"] : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  }
};
