const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPreprocessor = require('../loader/html-preprocessor')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlMinimizePlugin = require('html-minimizer-webpack-plugin')
const modulePaths = require('./module_paths')
const path = require('path')
const process = require('process')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              name: '[name].[ext]'
            }
          }
        ]
      },

      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          },
          {
            loader: path.resolve(__dirname, '../loader/html-prefix-loader.js'),
            options: {
              prefix: 'custom-'
            }
          },
          {
            loader: path.resolve(__dirname, '../loader/pug-data-loader.js'),
            options: {
              dataSources: ['data.yml', 'data.json'].map(name => path.resolve(process.cwd(), name))
            }
          }
        ]
      },

      {
        test: /\.html$/i,
        exclude: [
         path.resolve(process.cwd(), 'custom.html')
        ],
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          },
          path.resolve(__dirname, '../loader/html-include-resolve-loader.js')
        ]
      },

      // entrypoint
      {
        test: /custom.html$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: path.resolve(__dirname, '../loader/html-prefix-loader.js'),
            options: {
              prefix: 'custom-'
            }
          },
          path.resolve(__dirname, '../loader/html-include-resolve-loader.js')
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
  entry: {
    custom: ['./custom.scss', './custom.html'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    require('autoprefixer')
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist')
  },
  optimization: {
    removeEmptyChunks: true,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizePlugin()
    ]
  },
  resolveLoader: {
    modules: modulePaths()
  }
}