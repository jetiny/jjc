var assert = require('assert');
var JSON5 = require('../lib/index.js');

exports.pack = {}

exports.pack.simple = function () {
  var json = {a: 1, b: 2.05, c: 's', d: null, e: false, f: [1, 's']}
  var js = JSON5.pack(json)
  assert.strictEqual(typeof js, 'string', 'isString')
  assert.deepStrictEqual((1, eval)(js), json, 'eval')
}

exports.pack.bigArray = function () {
  var json = []
  for (var i= 0; i < 10000; ++i) {
    json.push({
      i,
      name: "something",
      boolean: true,
      number: 1,
      string: 'str'
    })
  }
  var js = JSON5.pack(json)
  assert.strictEqual(JSON.stringify(json).length - js.length > 0, true)
  assert.strictEqual(typeof js, 'string', 'isString')
  assert.deepStrictEqual((1, eval)(js), json, 'eval')
}
