const fs = require('fs')

module.exports = {
  plugins: {
    "posthtml-include": {},
    "posthtml-expressions": {
      locals: JSON.parse(fs.readFileSync("./template_vars.json"))
    }
  }
}