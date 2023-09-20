const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.min.[hash:8].js',
  },
  target: 'web',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/',to:'assets/'}
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i ,
      pngquant: {
        verbose:true,
        quality: '80-90',
      }
    })
    ,new HtmlPlugin({
      file:path.join(__dirname,'dist','index.html'),
      template:'./index.html'
    })
  ]
}