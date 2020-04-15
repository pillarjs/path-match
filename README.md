# path match

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/pillarjs/path-match/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/pillarjs/path-match/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/pillarjs/path-match/branch/master/graph/badge.svg)](https://codecov.io/gh/pillarjs/path-match)
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Thin wrapper around [path-to-regexp](https://github.com/component/path-to-regexp) to make extracting the param names easier.

```js
var route = require('path-match')({
  // path-to-regexp options
  sensitive: false,
  strict: false,
  end: false,
});

// create a match function from a route
var match = route('/post/:id');

// match a route
var parse = require('url').parse;
require('http').createServer(function (req, res) {
  var params = match(parse(req.url).pathname);

  // no match
  if (params === false) {
    res.statusCode = 404;
    res.end();
    return;
  }

  // the matched id
  var id = params.id;

  // do stuff with the ID
})
```

[npm-image]: https://img.shields.io/npm/v/path-match.svg?style=flat-square
[npm-url]: https://npmjs.org/package/path-match
[david-image]: http://img.shields.io/david/pillarjs/path-match.svg?style=flat-square
[david-url]: https://david-dm.org/pillarjs/path-match
[license-image]: http://img.shields.io/npm/l/path-match.svg?style=flat-square
[license-url]: LICENSE.md
[downloads-image]: http://img.shields.io/npm/dm/path-match.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/path-match
