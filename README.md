# path match

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
