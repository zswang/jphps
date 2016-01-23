var assert = require('should');
var jphps = require('../.');
var fs = require('fs');
var util = require('util');

/**
 * 清除 \r，为兼容 Windows 下的文本换行符 CRLF
 */
function cleanCRLF(text) {
  return String(text).replace(/\r\n?/g, '\n');
}

// coverage
jphps.build();
jphps.build('\r');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').replace(/\r/g, '');
}

describe('fixtures', function() {
  var items = fs.readdirSync('test/fixtures').filter(function(item) {
    return /\.input\.html$/.test(item);
  }).map(function(item) {
    return item.replace(/\.input\.html$/, '');
  });

  items.forEach(function(item) {
    var output_php = util.format('test/fixtures/%s.output.php', item);
    var text_input_html = cleanCRLF(fs.readFileSync(util.format('test/fixtures/%s.input.html', item)));
    var text_output_html = cleanCRLF(fs.readFileSync(util.format('test/fixtures/%s.output.html', item)));
    var text_output_php = cleanCRLF(fs.readFileSync(output_php));
    it(item, function() {
      assert.equal(text_output_php, jphps.build(text_input_html));
    });
    it(item + ' run()', function(done) {
      var exec = require("child_process").exec;
      exec(util.format('php "%s"', output_php), function (error, stdout, stderr) {
        assert.equal(error, null);
        assert.equal(text_output_html, stdout);
        done();
      });
    })
  });
});