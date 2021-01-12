const fs = require('fs')
const process = require('process')
const path = require('path')
const chalk = require('chalk')

module.exports = function () {
  const currentDir = process.cwd()
  const configPath = path.resolve(__dirname, '../configs')
  const fileNames = ['package.json', '.browserlist', '.parcelrc', '.postcssrc', 'posthtml.config.js']
  fileNames.forEach(filename => {
    const inPath = path.resolve(configPath, filename)
    const outPath = path.join(currentDir, filename)
    if (!fs.existsSync(outPath)) {
      console.log(chalk.blue(`Creating ${ filename }`))
      fs.copyFileSync(inPath, outPath)
    } else {
      console.log(chalk.yellow(`File ${ filename } already exists, skipping...`))
    }
  })
}
