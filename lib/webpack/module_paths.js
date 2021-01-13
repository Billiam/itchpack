const path = require('path')

module.exports = function() {
  const modulePath = path.resolve(__dirname, '../../node_modules').split(path.sep)
  return modulePath.reduce((paths, dir, index) => {
    if (dir === 'node_modules') {
      paths.push(modulePath.slice(0, index + 1).join(path.sep))
    }
    return paths
  }, []).reverse()
}