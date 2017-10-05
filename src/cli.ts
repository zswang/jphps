#!/usr/bin/env node


(function () {
  const jphps = require('..')
  const optimist = require('optimist')
  const mkdirp = require('mkdirp')
  const fs = require('fs')
  const path = require('path')
  const util = require('util')
  const colors = require('colors')

  let argv = optimist
    .usage('$0 input1.html [input2.html] -o output')

    .alias('h', 'help')
    .describe('h', 'show this help message and exit.')
    .string('h')

    .alias('o', 'output')
    .describe('o', 'output file.')
    .string('o')

    .alias('v', 'version')
    .describe('v', 'Print version number and exit.')

    .wrap(80)
    .argv

  if (argv._.length < 1) {
    if (argv.version) {
      let json = require('./package.json')
      console.log(json.name + ' ' + json.version)
      return
    }

    console.log(`
  Usage:

      #{j,yellow}#{php,green}#{s,yellow} <input list> [options]

  Options:

      #{-o, --output,cyan}              Output file (default STDOUT)
      #{-v, --version,cyan}             Output jphps version
      `.replace(/#\{(.*?),(\w+)\}/g, (all, text, color) => {
        return colors[color](text)
      })
    )
    return
  }

  let contents = []
  let filenames = []
  argv._.forEach(function (filename) {
    filenames.push(filename)
    contents.push(jphps.build(fs.readFileSync(filename), argv))
  })
  let content = contents.join('\n')
  if (argv.output) {
    mkdirp(path.dirname(argv.output))
    fs.writeFileSync(argv.output, content)
    console.log(colors.green(util.format('%j jphps output complete.', filenames)))
  }
  else {
    console.log(content)
  }
})()