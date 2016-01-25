var assert = require('should');
var jphps = require('../.');
var util = require('util');
var printValue;
function print(value) {
  if (typeof printValue !== 'undefined') {
    throw new Error('Test case does not match.');
  }
  printValue = value;
}
describe("./src/jphps.js", function () {
  printValue = undefined;
  it("isOutput():expression 1", function () {
    print(jphps.isOutput('print: #{$name}'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():expression 2", function () {
    print(jphps.isOutput('print: !#{$title}'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Begin \"&\"", function () {
    print(jphps.isOutput('& 8848'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Begin \"=\"", function () {
    print(jphps.isOutput('= 8848'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Begin \":\"", function () {
    print(jphps.isOutput(': 8848'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Begin \"|\"", function () {
    print(jphps.isOutput('| 8848'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Begin \"汉字\"", function () {
    print(jphps.isOutput('汉字'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Begin \"<\"", function () {
    print(jphps.isOutput('<li>item1</li>'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Begin \"##\"", function () {
    print(jphps.isOutput('## title'));
    assert.equal(printValue, true); printValue = undefined;
  });
  it("isOutput():Keyword \"else\"", function () {
    print(jphps.isOutput('else'));
    assert.equal(printValue, false); printValue = undefined;
  });
  it("isOutput():Keyword \"void\"", function () {
    print(jphps.isOutput('void'));
    assert.equal(printValue, false); printValue = undefined;
  });
  it("isOutput():Keyword \"try\"", function () {
    print(jphps.isOutput('try'));
    assert.equal(printValue, false); printValue = undefined;
  });
  it("isOutput():Keyword \"finally\"", function () {
    print(jphps.isOutput('finally'));
    assert.equal(printValue, false); printValue = undefined;
  });
  it("isOutput():Keyword \"elseif\"", function () {
    print(jphps.isOutput('elseif'));
    assert.equal(printValue, false); printValue = undefined;
  });
  it("isOutput():Keyword \"echo\"", function () {
    print(jphps.isOutput('echo VERSION'));
    assert.equal(printValue, false); printValue = undefined;
  });
  it("isOutput():Keyword \"do\"", function () {
    print(jphps.isOutput('do'));
    assert.equal(printValue, false); printValue = undefined;
  });
  it("isOutput():Not keyword \"hello\"", function () {
    print(jphps.isOutput('hello'));
    assert.equal(printValue, true); printValue = undefined;
  });
});
