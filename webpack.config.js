const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  mode: 'development',
  devtool: 'inline-sourcemap',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'html/index.html',
      alwaysWriteToDisk: true
    }),
    new CopyWebpackPlugin([
      { from: 'html/favicon.ico', to: 'build/favicon.ico', toType: 'dir' }
    ]),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.s?css$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader' }
        ]
      }
    ]
  }
}
