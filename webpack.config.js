const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// "content_scripts": [{
//       "matches": ["<all_urls>"],
//       "js": ["mypopup.js"]
//     }],
//      content_scripts: "./src/mypopup.js",

module.exports = {
  entry: {
    popup: "./src/index.js",
    background: "./src/background.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
