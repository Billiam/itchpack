const fs = require('fs')

module.exports = {
  plugins: {
    "posthtml-include": {},
    "posthtml-prefix-class": {
      prefix: "custom-",
      only: "user_formatted"
    },
    "posthtml-expressions": {
      locals: JSON.parse(fs.readFileSync("./template_vars.json"))
    }
  }
}