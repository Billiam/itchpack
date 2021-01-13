const fs = require('fs')
const path = require('path')
const INCLUDE_PATTERN = /<include src="(.+)"\/?>(?:<\/include>)?/gi;

const processNestedHtml = (content, loaderContext, filters) => {
  if (!INCLUDE_PATTERN.test(content)) {
    return content
  } else {
    return content.replace(INCLUDE_PATTERN, (m, src) => {
      let fileContent = fs.readFileSync(path.resolve(loaderContext.context, src), 'utf-8')
      //TODO rescue failure
      loaderContext.dependency(src)
      if (fileContent) {
        fileContent = filters.reverse().reduce((result, filter) => filter.method(result, filter.options), fileContent)
        return processNestedHtml(fileContent, loaderContext, filters)
      } else {
        return ''
      }
    })
  }
}

module.exports = processNestedHtml