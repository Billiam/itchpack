const webpack = require('webpack');
const devServer = require('webpack-dev-server/lib/Server')
const devserverConfig = require('./webpack/devserver.config.js')
const buildConfig = require('./webpack/build.config.js')
const path = require('path')
const chalk = require('chalk')
module.exports = {
  serve (host, port) {
    const isWsl = require('is-wsl')
    const compiler = webpack(devserverConfig)
    new devServer(compiler, {
      injectClient: true,
      open: !isWsl,
      overlay: true
    }).listen(port, host)
  },
  build ({ minify= true }) {
    buildConfig.optimization.minimize = minify
    const compiler = webpack(buildConfig)

    compiler.hooks.compilation.tap('itchpack', compilation => {
      compilation.hooks.chunkAsset.tap('itchpack', (chunk, file) => {
        if (file.endsWith('.js')) {
          delete compilation.assets[file]
        }
      })
    })

    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }
      const info = stats.toJson()
      if (stats.hasErrors() || stats.hasWarnings() && (info.errors.length > 0 || info.warnings.length > 0)) {
        if (stats.hasErrors()) {
          console.error(chalk.red(stats.compilation.errors))
        }

        if (stats.hasWarnings()) {
          console.warn(chalk.yellow(stats.compilation.warnings))
        }
        return
      }

      stats.compilation.comparedForEmitAssets.forEach(file => {
        console.log(chalk.blue`No Change: ${ path.relative(process.cwd(), path.resolve(stats.compilation.compiler.outputPath, file)) }`)
      })

      stats.compilation.emittedAssets.forEach(file => {
        console.log(chalk.green`Saved: ${ path.relative(process.cwd(), path.resolve(stats.compilation.compiler.outputPath, file)) }`)
      })
    })
  }
}