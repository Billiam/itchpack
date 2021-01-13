const { getOptions } = require('loader-utils')
const preprocessor = require('./html-preprocessor')

module.exports = function (content, map, meta) {
  const options = getOptions(this)
  return preprocessor(content, this)
}