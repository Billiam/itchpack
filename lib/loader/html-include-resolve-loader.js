const includeReplacer = require('./html-include-processor')
const path = require('path')

function requireFromString(src, filename) {
  var Module = module.constructor
  var m = new Module()
  m._compile(src, filename)
  return m.exports
}

const resolveLoader = async function (content, map, meta) {
  const done = this.async()
  const self = this
  const result = await includeReplacer(content, async function (src) {
    const fullPath = path.resolve(self.context, src)
    return new Promise((resolve, reject) => {
      self.loadModule(fullPath, function (err, source, srcMap, module) {
        // console.log("result ------------", typeof source, source)
        // console.log("err ---------------", err)
        // console.log("srcmap ------------", srcMap)
        // console.log("module ------------", module)
        if (err) {
          return reject(err)
        }

        const newModule = requireFromString(source, fullPath)
        if (typeof newModule === 'function') {
          const result = newModule.apply(self)
          resolve(result)
        } else {
          resolve(newModule)
        }
      })
    })
  })

  done(null, result)
}

module.exports = resolveLoader
