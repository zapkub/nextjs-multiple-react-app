const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '../../static/fragment'),
    filename: 'core.js'
  },
  entry: path.join(__dirname, './index.js'),
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  externals: {
    'jamplay-context': 'window.__JAMPLAY_GLOBAL_CONTEXT__',
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    'next/router': 'window.router',
    'styled-components': 'window.StyledComponents'

  }
}
