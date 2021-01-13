const webpack = require('webpack');
const devServer = require('webpack-dev-server/lib/Server')
const devserverConfig = require('./webpack/devserver.config.js')
const path = require('path')

module.exports = {
  serve (port) {
    const compiler = webpack(devserverConfig)
    new devServer(compiler, {
      injectClient: true,
      open: true
    }).listen(port, '127.0.0.1')
  },
  build () {
    process.env.PARCEL_AUTOINSTALL = 'false'

    const entryPoints =  ['template.html', 'custom.html'].map(filename => path.resolve(process.cwd(), filename))
    const bundler = new Bundler(entryPoints, { cache: false, sourceMaps: false, autoinstall: false })
    bundler.on('bundled', (bundle) => {
      console.log(bundle)
    })
    bundler.bundle()
  }
}