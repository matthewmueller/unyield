/**
 * Module Dependencies
 */

var co = require('co');

/**
 * Expose `unyield`
 */

module.exports = unyield;

/**
 * Unyield
 *
 * @param {Generator} gen
 * @return {Function}
 * @api public
 */

function unyield(gen) {
  return function() {
    var last = arguments[arguments.length - 1];
    var fn = 'function' == typeof last && last;

    return fn
      ? co(gen).apply(this, arguments)
      : gen.apply(this, arguments);
  }
}
