const path = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "build"),
    libraryTarget: "system", //打包成systemjs认识的模块
  },
  devtool: "source-map",
  devServer: {
    port: 9100,
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWepackPlugin({
      template: "./src/index.html",
      inject: false, //别给我注入脚本
    }),
  ],
  externals: ["react", "react-dom", "react-router-dom"], //这些公用库不要给我打包
};
