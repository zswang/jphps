const fs = require('fs')
const path = require('path')

var filename = path.join(__dirname, 'package.json')
var pkg = JSON.parse(fs.readFileSync(filename))
pkg.version = pkg.version.replace(/-?\d+$/, function (value) {
  return parseInt(value) + 1
})

fs.writeFileSync(filename, JSON.stringify(pkg, null, '  '))