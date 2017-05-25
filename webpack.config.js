
const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

const plugins = [

  new ExtractTextPlugin("/public/[name].min.css"),

  new HtmlWebpackPlugin({
    template: "./src/templates/index.hbs",
    alwaysWriteToDisk: true
  }),

  new HtmlWebpackHarddiskPlugin({
    outputPath: path.resolve(__dirname, "server")
  }),

  new webpack.HotModuleReplacementPlugin()

];

module.exports = {

  plugins,

  devtool: "cheap-module-source-map",

  entry: {
    main: [
      "./src/main.js"
    ]
  },

  output: {
    path: path.join(__dirname, "./public"),
    publicPath: "/public/",
    filename: "[name].min.js"
  },

  devServer: {
    contentBase: path.join(__dirname, "./server"),
    publicPath: "/public/",

    compress: true,
    hot: true,

    port: 9500
  },

  module: {

    rules: [

      {
        test: /\.html$/,
        loader: "raw-loader"
      },

      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },

      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },

      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: "json-loader"
      },

      {
        test: /\.styl$/,
        loaders: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [ require("autoprefixer") ]
              }
            },
            "stylus-loader"
          ]
        })
      }

    ]

  }

};
