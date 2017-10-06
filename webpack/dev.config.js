"use strict";

var path = require("path"),
  SRC_PATH = path.join(__dirname, "../src"),
  webpack = require("webpack"),
  config = require("./webpack.config"),
  customTheme = require("../theme.json"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

config.devtool = "source-map";

config.entry.app.unshift("webpack/hot/only-dev-server");
config.entry.app.unshift("webpack-dev-server/client");
config.entry.app.unshift("react-hot-loader/patch");

config.devServer = {
  disableHostCheck: true,
  host: "0.0.0.0",
  port: process.env.PORT
};

config.module.rules[1].use = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: [
    {
      loader: "css-loader"
    },
    {
      loader: "postcss-loader"
    },
    {
      loader: "less-loader",
      options: {
        paths: [SRC_PATH],
        modifyVars: customTheme
      }
    }
  ]
});

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
