/*var describe = require('../lib/spec_my_node').describe;
var inspect = require('sys').inspect;
var assert = require('assert');

describe("Async calls").
   it ("Should handle async", function (evalCallback) {

  var n = 0;
    setTimeout(function(){
        ++n;
        assert.ok(true);
    }, 200);
    setTimeout(function(){
        ++n;
        assert.ok(true);
    }, 200);
   
    evalCallback( function () {
      assert.equal(2, n, 'Ensure both timeouts are called');
      n.should().beEqual(2);
    });
  
  }).
  it ("Should recognise failed async test", function (evalCallback) {
    var n = 0;
    setTimeout(function(){
        ++n;
        assert.ok(true);
    }, 200);
    
    evalCallback( function () {
      assert.equal(2, n, 'Ensure both timeouts are called');
      n.should().beEqual(2);
    });
    
  });*/
