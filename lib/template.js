const axios = require('axios')
const { parse } = require('node-html-parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const process = require('process')
const { css: cssBeautify, html: htmlBeautify } = require('js-beautify')

const writeFile = function (filename, content, force = false) {
  const currentDir = process.cwd()
  const outputPath = path.join(currentDir, filename)
  if ( ! fs.existsSync(outputPath) || force) {
    fs.writeFileSync(outputPath, content)
    console.log(chalk.blue(`Created ${ filename }`))
  } else {
    console.log(chalk.yellow(`File ${filename} already exists, skipping...`))
  }
}

module.exports = function (url) {
  console.log(chalk.blue(`Fetching ${ url } ...`))

  axios.get(url).then(function (response) {
    const root = parse(response.data)
    const gameContent = root.querySelector('.user_formatted')
    const originalContent = gameContent.innerHTML
    const customStyle = root.querySelector('.custom_css')
    const head = root.querySelector('head')
    if (customStyle) {
      head.removeChild(customStyle)
    }
    gameContent.set_content('<include src="custom.html"></include>')

    writeFile('template.html', htmlBeautify(root.innerHTML))
    writeFile('custom.html', htmlBeautify(originalContent))
    writeFile('custom.scss', customStyle ? cssBeautify(customStyle.innerHTML) : '')

  }).catch(err => {
    console.error(err)
  })
}