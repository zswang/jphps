const jphps = require('../')

describe("src/jphps.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }

  it("isOutput():expression 1", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('print: #{$name}'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():expression 2", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('print: !#{$title}'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Begin \"&\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('& 8848'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Begin \"=\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('= 8848'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Begin \":\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput(': 8848'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Begin \"|\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('| 8848'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Begin \"汉字\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('汉字'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Begin \"<\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('<li>item1</li>'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Begin \"##\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('## title'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
  it("isOutput():Keyword \"else\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('else'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
  it("isOutput():Keyword \"void\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('void'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
  it("isOutput():Keyword \"try\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('try'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
  it("isOutput():Keyword \"finally\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('finally'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
  it("isOutput():Keyword \"elseif\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('elseif'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
  it("isOutput():Keyword \"echo\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('echo VERSION'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
  it("isOutput():Keyword \"do\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('do'));
    assert.equal(examplejs_printLines.join("\n"), "false"); examplejs_printLines = [];
  });
  it("isOutput():Not keyword \"hello\"", function() {
    examplejs_printLines = [];
    examplejs_print(jphps.isOutput('hello'));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
});