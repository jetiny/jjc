// from https://github.com/json5/json5

const generate = require('./generate.js')

module.exports = function (obj, replacer, space) {
    return generate(obj, replacer, space)
};
