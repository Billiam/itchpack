const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const modulePaths = require('./module_paths')
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
          path.resolve(process.cwd(), 'template.html')
        ],
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
          path.resolve(__dirname, '../loader/html-include-resolve-loader.js')
        ]
      },

      // entrypoint
      {
        test: /template\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: false
            }
          },
          {
            loader: path.resolve(__dirname, '../loader/html-include-resolve-loader.js')
          },
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
    modules: modulePaths()
  }
}