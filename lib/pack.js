
const generate = require('./generate.js')

const digits = "xkjzqetnrisouaflchpdvmgybw0516372984"
const digitSize = digits.length
const baseSize = digitSize - 10

function baseNum (num) {
  let base = baseSize
  let ret = ""
  do {
    ret += digits.charAt(num % base)
    num = Math.floor(num / base)
    base = digitSize
  } while (num > 0)
  return ret
}

function $ () {
  var a = arguments, r = {};
  for (var i = 0; i < a.length; i += 2) {
    r [a[i]] = a[i+1]
  }
  return r
}

const $text = $.toString().replace(/\s/g, '').replace(/(var|return|function)/g, '$1 ')

module.exports = function (obj, opts = {}) {
  let map = new Map()
  let num = 0
  function normal (val, isObjectKey) {
    if (isObjectKey) {
      return normal(`"${val}"`)
    }
    let ret
    if (map.has(val)) {
      ret = map.get(val)
    } else {
      ret = {
        hit: 0,
        id: baseNum(num++)
      }
      map.set(val, ret)
    }
    ret.hit++
    return `'${ret.id}'`
  }
  let text = generate(obj, opts.replacer, opts.indent, {
    charEnter: '$(',
    charLeave: ')',
    normal
  })
  
}
