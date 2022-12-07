const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
