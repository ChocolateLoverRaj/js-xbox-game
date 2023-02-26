import { Configuration, ProvidePlugin } from 'webpack'
import HtmlWebpackPlugin = require('html-webpack-plugin')
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import 'webpack-dev-server'
import { join } from 'path'

const isDevServer = process.env.WEBPACK_SERVE === 'true'

const config: Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src',
  output: {
    clean: true,
    path: join(__dirname, '../UWP/Assets/WebView')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    ...isDevServer
      ? [
          new BundleAnalyzerPlugin({ openAnalyzer: false })
        ]
      : []
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      assert: require.resolve('assert/')
    }
  },
  module: {
    rules: [{
      test: /\.tsx?/,
      exclude: /node_modules\/(?!observables\/).*/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        plugins: ['react-require']
      }
    }, {
      test: /\.tsx?/,
      include: /node_modules\/observables\//,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        plugins: ['react-require']
      }
    }]
  },
  devServer: {
    allowedHosts: 'all'
  },
  target: ['web', 'es2017']
}

export default config
