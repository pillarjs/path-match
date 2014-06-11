
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

      var key, param;
      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        param = m[i + 1];
        if (!param) continue;
        params[key.name] = decodeParam(param);
        if (key.repeat) params[key.name] = params[key.name].split(key.delimiter)
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
