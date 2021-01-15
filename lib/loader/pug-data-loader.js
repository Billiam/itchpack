const pug = require('pug')
const loaderUtils = require('loader-utils')
const fs = require('fs')
const YAML = require('yaml')
const path = require('path')
const chalk = require('chalk')

module.exports = function (source) {
  const loaderOptions = loaderUtils.getOptions(this)

  if (loaderOptions.dataSources) {
    try {
      const file = loaderOptions.dataSources.find(loadPath => {
        return ['.json', '.yml'].includes(path.extname(loadPath)) && fs.existsSync(loadPath)
      })

      if (file) {
        const data = fs.readFileSync(file, 'utf8')
        if (file.endsWith('.yml')) {
          loaderOptions.data = YAML.parse(data)
        } else if (file.endsWith('.json')) {
          loaderOptions.data = JSON.parse(data)
        }
        this.addDependency(file)
      }
    } catch(e) {
      console.error(chalk.red(e))
    }
  }

  const options = Object.assign({
    filename: this.resourcePath,
    doctype: 'html',
    compileDebug: this.debug || false
  }, loaderOptions)

  const template = pug.compile(source, options)
  template.dependencies.forEach(this.addDependency)
  return template(options.data || {})
}
