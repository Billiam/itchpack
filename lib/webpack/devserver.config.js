const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prefixer = require('html-class-prefixer')
const htmlPreprocessor = require('../loader/html-preprocessor')
const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: false,
              preprocessor: (content, loaderContext) => {
                const prefixOptions = { prefix: 'custom-' }
                const filters = [{ method: prefixer.sync, options: prefixOptions }]
                return htmlPreprocessor(content, loaderContext, filters)
              }
            }
          }
        ]
      },
      {
        test: /\.(s?css|sass)/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {
                    grid: true,
                    overrideBrowserslist: [
                      'last 2 years',
                      '> 1%',
                      'not dead'
                    ]
                  }]
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  entry: ['./custom.scss'],
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'template.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin(),
    require('autoprefixer')
  ],
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, '../../node_modules')]
  }
}