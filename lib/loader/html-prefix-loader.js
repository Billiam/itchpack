const { getOptions } = require('loader-utils')
const prefixer = require('html-class-prefixer')

const loader = function (content, map, meta) {
  var callback = this.async();
  const options = getOptions(this)
  if ( ! options.prefix) {
    callback(null, content);
    return
  }

  prefixer(content, options).then(function(val) {
    callback(null, val)
  }).fail(function(err) {
    callback(err)
  })
}

module.exports = loader