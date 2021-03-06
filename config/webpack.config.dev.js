var webpack = require('webpack')
var path = require('path')
var paths = require('./paths')
var HtmlWebpackPlugin = require('html-webpack-plugin')
require('./environment')
const defaultConfig = require('./webpack.common')
import { log } from './log'

const devConfig = Object.assign({}, defaultConfig, {
  devtool: "source-map",
  devServer: {
    contentBase: './build/',
    hot: true,
    historyApiFallback: true,
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'index'),
  ],
  watch: true,
  progress: true,
  preLoaders: [
    {
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/,
      configFile: `${paths.appRoot}/.eslintrc`,
    },
  ],
})

devConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
devConfig.plugins.push(
  new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml,
  })
)
devConfig.module.loaders.push(
  {
    test: /\.scss$/,
    loader: 'style!css!postcss!sass?sourceMap',
  }
)
log('Webpack dev config finished')
module.exports = devConfig
