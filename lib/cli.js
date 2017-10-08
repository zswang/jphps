#!/usr/bin/env node
(function () {
    var jphps = require('..');
    var optimist = require('optimist');
    var mkdirp = require('mkdirp');
    var fs = require('fs');
    var path = require('path');
    var colors = require('colors');
    var argv = optimist
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
        .argv;
    if (argv._.length < 1) {
        if (argv.version) {
            var json = require('./package.json');
            console.log(json.name + ' ' + json.version);
            return;
        }
        console.log("\n  Usage:\n\n      #{j,yellow}#{php,green}#{s,yellow} <input list> [options]\n\n  Options:\n\n      #{-o, --output,cyan}              Output file (default STDOUT)\n      #{-v, --version,cyan}             Output jphps version\n      ".replace(/#\{(.*?),(\w+)\}/g, function (all, text, color) {
            return colors[color](text);
        }));
        return;
    }
    var contents = [];
    var filenames = [];
    argv._.forEach(function (filename) {
        filenames.push(filename);
        contents.push(jphps.build(fs.readFileSync(filename), argv));
    });
    var content = contents.join('\n');
    if (argv.output) {
        mkdirp(path.dirname(argv.output));
        fs.writeFileSync(argv.output, content);
        console.log(colors.green(filenames + " jphps output complete."));
    }
    else {
        console.log(content);
    }
})();
