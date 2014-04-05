
var pathToRegexp = require('path-to-regexp');

module.exports = function (options) {
  options = options || {};

  return function (path) {
    var keys = [];
    var re = pathToRegexp(path, keys, options);

    return function (pathname, params) {
      var m = re.exec(pathname);
      if (!m) return false;

      params = params || {};

      for (var i = 1; i < m.length; i++) {
        if (!m[i]) continue; // undefined from optionals
        params[keys[i - 1].name] = decodeParam(m[i]);
      }

      return params;
    }
  }
}

function decodeParam(param) {
  try {
    return decodeURIComponent(param);
  } catch (_) {
    var err = new Error('failed to decode param "' + param + '"');
    err.status = 400;
    throw err;
  }
}