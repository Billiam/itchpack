const path = require('path')
const INCLUDE_PATTERN = /<include src="(.+)"\/?>(?:<\/include>)?/gi;
const replaceAsync = require('string-replace-async')

const processNestedHtml = async (content, callback) => {
  if (!INCLUDE_PATTERN.test(content)) {
    return callback(null)
  }

  return await replaceAsync(content, INCLUDE_PATTERN, async (match, src) => {
      return await callback(src)
  })
}

module.exports = processNestedHtml