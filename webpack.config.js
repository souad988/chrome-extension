const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
// const dotenv = require("dotenv");

// // this will update the process.env with environment variables in .env file
// dotenv.config();
module.exports = {
  entry: {
    popup: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    alias: {
      buttons: path.resolve(__dirname, "src/Buttons/"),
      contexts: path.resolve(__dirname, "src/Contexts/"),
      contracts: path.resolve(__dirname, "src/Contracts/"),
      pages: path.resolve(__dirname, "src/Pages/"),
      components: path.resolve(__dirname, "src/Components"),
    },
    extensions: [".js", ".jsx"],
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
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      REACT_APP_MNEMONICS: JSON.stringify({
        0: "<wallet phrase>",
        1: "<wallet phrase>",
        2: "<wallet phrase>",
        3: "<wallet phrase>",
        4: "<wallet phrase>",
      }),
      REACT_APP_API_KEY: "<Provider API Key>",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};

// {
//     test: /\.(scss)$/,
//     use: [{
//       loader: 'style-loader', // inject CSS to page
//     }, {
//       loader: 'css-loader', // translates CSS into CommonJS modules
//     }, {
//       loader: 'postcss-loader', // Run post css actions
//       options: {
//         plugins: function () { // post css plugins, can be exported to postcss.config.js
//           return [
//             require('precss'),
//             require('autoprefixer')
//           ];
//         }
//       }
//     }, {
//       loader: 'sass-loader' // compiles Sass to CSS
//     }]
//   },
