require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const S3Plugin = require("webpack-s3-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = env => {
  return {
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "public"),
      filename: `bundle.${env.deploy ? "[hash]." : ""}js`
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      redux: "Redux",
      "react-redux": "ReactRedux",
      newamericadotorg: "newamericadotorg"
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({ filename: "bundle.css" }),
      new HtmlWebpackPlugin({
        title: "",
        chartIDs: [],
        inject: false,
        template: path.resolve(__dirname, "src/index.html")
      }),
      env.deploy &&
        new CompressionPlugin({
          test: /\.(js|css)$/,
          asset: "[path].gz[query]",
          algorithm: "gzip",
          deleteOriginalAssets: false
        }),
      env.deploy &&
        new FileManagerPlugin({
          onEnd: {
            copy: [
              {
                source: "public/bundle.[hash].js.gz",
                destination: "public/dist/bundle.js.gz"
              },
              {
                source: "public/bundle.[hash].js",
                destination: "public/bundle.js"
              }
            ],
            delete: ["public/bundle.[hash].js"]
          }
        }),
      env.deploy &&
        new S3Plugin({
          s3Options: {
            accessKeyId: process.env.AWS_ACCESS_KEY, // Your AWS access key
            secretAccessKey: process.env.AWS_SECRET_KEY, // Your AWS secret key
            region: "us-east-1"
          },
          s3UploadOptions: {
            Bucket: "datadotnewamerica",
            ContentEncoding(fileName) {
              if (/\.gz/.test(fileName)) {
                return "gzip";
              }
            },
            ContentType(fileName) {
              if (/\.css/.test(fileName)) {
                return "text/css";
              }
              if (/\.js/.test(fileName)) {
                return "text/javascript";
              }
            }
          },
          basePath: path.basename(__dirname),
          directory: "public"
        })
    ].filter(plugin => plugin),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: "babel-loader",
          options: {
            presets: ["es2015", "react"],
            plugins: [
              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        },
        {
          test: /\.s?css/,
          use:
            env.NODE_ENV === "production"
              ? ["style-loader", "css-loader", "sass-loader"]
              : ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ["css-loader", "sass-loader"]
                })
        }
      ]
    }
  };
};
