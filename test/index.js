
var assert = require('assert');

var route = require('..')();

it('/:a/:b', function () {
  var match = route('/:a/:b');
  var params = match('/a/b');
  assert.deepEqual(params, {
    a: 'a',
    b: 'b',
  })
})

it('/:a/b', function () {
  var match = route('/:a/b');
  var params = match('/a/b');
  assert.deepEqual(params, {
    a: 'a',
  })
})

it('/:a/b/:c', function () {
  var match = route('/:a/b/:c');
  var params = match('/a/b/c');
  assert.deepEqual(params, {
    a: 'a',
    c: 'c',
  })
})

describe('/:a/b/:c?', function () {
  var match = route('/:a/b/:c?');

  it('/a/b/c', function () {
    var params = match('/a/b/c');
    assert.deepEqual(params, {
      a: 'a',
      c: 'c',
    })
  })

  it('/a/b', function () {
    var params = match('/a/b');
    assert.deepEqual(params, {
      a: 'a',
    })
  })
})

describe('/:a/:b/:c*', function () {
  var match = route('/:a/:b/:c*')

  it('/a/b', function () {
    var params = match('/a/b')
    assert.deepEqual(params, {
      a: 'a',
      b: 'b',
    })
  })

  it('/a/b/c', function () {
    var params = match('/a/b/c')
    assert.deepEqual(params, {
      a: 'a',
      b: 'b',
      c: ['c'],
    })
  })

  it('/a/b/c/d', function () {
    var params = match('/a/b/c/d')
    assert.deepEqual(params, {
      a: 'a',
      b: 'b',
      c: ['c', 'd']
    })
  })

  it('/a/b/c/d/e', function () {
    var params = match('/a/b/c/d/e')
    assert.deepEqual(params, {
      a: 'a',
      b: 'b',
      c: ['c', 'd', 'e']
    })
  })
})

describe('/:a/:b/:c+', function () {
  var match = route('/:a/:b/:c+')

  it('/a/b', function () {
    var params = match('/a/b')
    assert.deepEqual(params, false)
  })

  it('/a/b/c', function () {
    var params = match('/a/b/c')
    assert.deepEqual(params, {
      a: 'a',
      b: 'b',
      c: ['c'],
    })
  })

  it('/a/b/c/d', function () {
    var params = match('/a/b/c/d')
    assert.deepEqual(params, {
      a: 'a',
      b: 'b',
      c: ['c', 'd']
    })
  })

  it('/a/b/c/d/e', function () {
    var params = match('/a/b/c/d/e')
    assert.deepEqual(params, {
      a: 'a',
      b: 'b',
      c: ['c', 'd', 'e']
    })
  })
})
