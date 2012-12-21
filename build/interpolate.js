(function (undefined) {
  'use strict';

  /**
   * Regex for finding all placeholders
   * @type {RegExp}
   */
  var PLACEHOLDER_REGEX = /({[\d]+})/g;

  /**
   * Formats the target with replacement values
   * @param {String} target
   * @param {Array} replacements
   * @return {String}
   */
  function format(target, replacements) {
    target = target || '';
    replacements = replacements || [];

    var placeholderCount = 0;

    while (PLACEHOLDER_REGEX.exec(target) !== null) {
      placeholderCount += 1;
    }

    var length = Math.min(replacements.length, placeholderCount),
      i = 0,
      regex = null;

    for (i; i < length; i++) {
      regex = new RegExp('\\{' + i + '\\}', 'g');
      target = target.replace(regex, replacements[i].toString());
    }

    return target;
  }

  /**
   * Interpolates the target string with any additional arguments
   * @param {String|...String} target
   */
  var interpolate = function (target) {
    if (arguments.length > 1) {
      return format(target, Array.prototype.slice.call(arguments, 1));
    }

    return {
      format: function () {
        return format(target, Array.prototype.slice.call(arguments, 0));
      },
      toString: function () {
        return target;
      }
    };
  };

  /*
   * Export interpolate
   */

  //CommonJS
  /*global module*/
  if (typeof module !== 'undefined' && module.exports) {
    return module.exports = interpolate;
  }

  //AMD
  /*global define*/
  if (typeof define === "function" && define.amd) {
    return define('interpolate', [], function () {
      return interpolate;
    });
  }

  //assign to global `window` object
  this['interpolate'] = interpolate;

}).call(this);