/*global describe, it*/
var mocha = require('mocha'),
  assert = require('chai').assert,
  interpolate = require('../build/interpolate');

describe('interpolate', function () {

  describe('single-use function invocation', function () {

    it('should interpolate all values', function (done) {
      var target = "0: {0}, 1: {1}, 2: {2}";
      var expected = "0: zero, 1: one, 2: two";
      var actual = interpolate(target, 'zero', 'one', 'two');
      assert.equal(expected, actual);
      done();
    });

    it('should interpolate values even though there are more placeholders', function (done) {
      var target = "0: {0}, 1: {1}, 2: {2}";
      var expected = "0: zero, 1: one, 2: {2}";
      var actual = interpolate(target, 'zero', 'one');
      assert.equal(expected, actual);
      done();
    });

    it('should interpolate as many values as there are placeholders', function (done) {
      var target = "0: {0}, 1: {1}, 2: {2}";
      var expected = "0: zero, 1: one, 2: two";
      var actual = interpolate(target, 'zero', 'one', 'two', 'three', 'four', 'five');
      assert.equal(expected, actual);
      done();
    });

  });

  describe('multi-use wrapper', function () {

    it('should interpolate all values', function (done) {
      var target = "0: {0}, 1: {1}, 2: {2}";
      var expected1 = "0: zero, 1: one, 2: two";
      var expected2 = "0: 0, 1: 1, 2: 2";
      var wrapper = interpolate(target);
      var actual1 = wrapper.format('zero', 'one', 'two');
      assert.equal(expected1, actual1);
      var actual2 = wrapper.format(0, 1, 2);
      assert.equal(expected2, actual2);
      done();
    });

    it('should interpolate values even though there are more placeholders', function (done) {
      var target = "0: {0}, 1: {1}, 2: {2}";
      var expected1 = "0: zero, 1: one, 2: {2}";
      var expected2 = "0: 0, 1: 1, 2: {2}";
      var wrapper = interpolate(target);
      var actual1 = wrapper.format('zero', 'one');
      assert.equal(expected1, actual1);
      var actual2 = wrapper.format(0, 1);
      assert.equal(expected2, actual2);
      done();
    });

    it('should interpolate as many values as there are placeholders', function (done) {
      var target = "0: {0}, 1: {1}, 2: {2}";
      var expected1 = "0: zero, 1: one, 2: two";
      var expected2 = "0: 0, 1: 1, 2: 2";
      var wrapper = interpolate(target);
      var actual1 = wrapper.format('zero', 'one', 'two', 'three', 'four');
      assert.equal(expected1, actual1);
      var actual2 = wrapper.format(0, 1, 2, 3, 4);
      assert.equal(expected2, actual2);
      done();
    });

    it('should return original target as string value', function (done) {
      var target = "0: {0}, 1: {1}, 2: {2}";
      var wrapper = interpolate(target);
      assert.equal(target, wrapper.toString());
      wrapper.format('zero', 'one', 'two');
      assert.equal(target, wrapper.toString());
      done();
    });
  });
});