'use strict';
require('../common');
var Readable = require('../../').Readable;
var assert = require('assert');

var s = new Readable({
  highWaterMark: 20,
  encoding: 'ascii'
});

var list = ['1', '2', '3', '4', '5', '6'];

s._read = function(n) {
  var one = list.shift();
  if (!one) {
    s.push(null);
  } else {
    var two = list.shift();
    s.push(one);
    s.push(two);
  }
};

s.read(0);

// ACTUALLY [1, 3, 5, 6, 4, 2]

process.on('exit', function() {
  assert.deepEqual(s._readableState.buffer,
                   ['1', '2', '3', '4', '5', '6']);
  console.log('ok');
});
