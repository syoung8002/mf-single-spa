path: frontend
---
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => ({
  entry: path.resolve(__dirname, "src/root-config"),
  output: {
    filename: "root-config.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "sourcemap",
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/public/index.html",
      templateParameters: {
        isLocal: env && env.isLocal === "true",
      },
    }),
    new CleanWebpackPlugin(),
  ],
});