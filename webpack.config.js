var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/app",
  entry: [
    'webpack-hot-middleware/client',
    './index',
  ],

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/static/",
    filename: "app.js",
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel"],
      },
      {
        test: /\.html$/,
        loaders: ["file?name=[name].[ext]"],
      },
      {
        test:/\.(png|jpg)$/,
        loaders: ["url-loader?limit=8192"],
      },
    ],
  },
}
