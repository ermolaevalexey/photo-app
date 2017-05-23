
const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [

  new ExtractTextPlugin("/public/[name].min.css"),

  new HtmlWebpackPlugin({ template: "./src/templates/index.hbs" }),

  new webpack.HotModuleReplacementPlugin()

];

module.exports = {

  plugins,

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
    contentBase: path.join(__dirname, "./public"),
    publicPath: "/public/",

    compress: true,
    hot: true,

    port: 9500,

    // unfortunately HtmlWebpackPlugin and WebpackDevServer
    // do not communicate with each other,
    // so this is kinda workaround to handle built template
    // and built static files in a separate-like way
    proxy: {
      "/": "http://localhost:9500/public/"
    }
  },

  module: {

    rules: [

      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },

      {
        test: /\.html$/,
        loader: "raw-loader"
      },

      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
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
