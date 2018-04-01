
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

const FUNC_TEXT = $.toString()
  .replace(/\s/g, '')
  .replace(/(var|return|function)/g, '$1 ')
  .replace('$', '')

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
      ret.key = `'${ret.id}'`
      map.set(val, ret)
    }
    ret.hit++
    return ret.key
  }
  let text = generate(obj, opts.replacer, opts.indent, {
    charEnter: '$(',
    charLeave: ')',
    split: ',',
    normal
  })

  let level = 1 + (opts.level || 1)
  let arr = []
  // @TODO 对象聚合
  // let objectRE = /\$\((('\w+',?)+)\)/
  map.forEach(function (it, key) {
    if (it.hit < level) {
      if (it.hit === 1) {
        text = text.replace(it.key, key)
        return
      }
    } else {
      arr.push(`${it.id}=${key}`)
    }
    text = text.replace(new RegExp(it.key, 'g'), it.id)
  })
  let VAR_TEXT = arr.length ? ('var ' + arr.join(',') + ';') : ''
  let RET_TEXT = text
  let fmt = `(function($){${VAR_TEXT}return ${RET_TEXT};})(${FUNC_TEXT})`
  return fmt
}
