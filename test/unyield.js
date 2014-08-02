/**
 * Module Dependencies
 */

var assert = require('assert');
var unyield = require('../');

/**
 * Tests
 */

describe('unyield', function() {

  it('should work with generators', function (done) {

    var fn = unyield(function *() {
      return yield wait(100);
    });

    fn(function(err, ms) {
      assert(!err)
      assert(ms >= 100);
      done();
    });
  })

  it('should pass args and ctx through', function(done) {
    var fn = unyield(function *(a, b) {
      assert(this.ctx == 'c');
      assert(a == 'a');
      assert(b == 'b');
    });

    fn.call({ ctx: 'c' }, 'a', 'b', done);
  })

  it('should be yieldable', function *() {
    var ms = yield unyield(function *() {
      return yield wait(100);
    });

    assert(ms >= 100);
  })
})

function wait(ms) {
  return function(done) {
    setTimeout(function() {
      done(null, ms);
    }, ms);
  }
}
