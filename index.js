
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

      var x, param;
      for (var i = 0; i < keys.length; i++) {
        param = m[x = i + 1];
        if (!param) continue;
        params[keys[i].name] = decodeParam(param);
      }

      var tail = m.slice(++x).join('/');
      if (tail) params.tail = tail;

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
