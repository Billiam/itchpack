const Bundler = require('parcel-bundler')
const path = require('path')

module.exports = {
  serve (port) {
    process.env.PARCEL_AUTOINSTALL = 'false'
    const entryPoints =  path.resolve(process.cwd(), 'template.html')
    const bundler = new Bundler(entryPoints, { outDir: './.bundle_tmp', autoInstall: false });
    const resolver = bundler.resolver
    bundler.resolver = {
      resolve(a, b) {
        console.log('requesting', a, b)
        return resolver.resolve(a, b)
      }
    }
    bundler.serve(port)
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