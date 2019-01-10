// modules
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import webpack from 'webpack'

process.noDeprecation = true

const config = {
  target: 'node',
  mode: process.env.NODE_ENV,
  externals: [ nodeExternals() ],
  entry: {
    'command': [
      './src/liquid'
    ]
  },
  watch: false,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'liquid.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        options: {}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@packageJSON': path.resolve(__dirname, './package.json'),
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@config': path.resolve(__dirname, './src/config'),
      '@app': path.resolve(__dirname, './src/app')
    },
    extensions: ['*', '.js', '.json']
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, 'build')
    ]),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true
    })
  ]
}

export default config
