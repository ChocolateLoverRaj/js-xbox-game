import { Configuration } from 'webpack'
import HtmlWebpackPlugin = require('html-webpack-plugin')
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import 'webpack-dev-server'

const isDevServer = process.env.WEBPACK_SERVE === 'true'

const config: Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    ...isDevServer
      ? [
          new BundleAnalyzerPlugin({ openAnalyzer: false })
        ]
      : []
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.tsx?/,
      exclude: /node_modules\/(?!observables\/).*/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
        plugins: ['react-require']
      }
    }]
  },
  devServer: {
    allowedHosts: 'all'
  }
}

export default config
