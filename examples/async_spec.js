var describe = require('Jody').describe;
var inspect = require('sys').inspect;
var assert = require('assert');

var asyncTest = function (cb) {
  setTimeout(function () {
   cb(true, false); 
  }, 200);
};

var n = 0;

var asyncAdder = function (cb) {
  setTimeout(function () {
    n++;
    cb(n); 
  }, 200);

};

describe("Async calls").
it ("Should handle async", function (async) {

  asyncAdder(async(function (n) {
    n.should().beEqual(1);
  }));;

  asyncAdder(async(function (n) {
    n.should().beEqual(2);
  }));
  
}).
it ("Should recognise failed async test", function (async) {
  asyncAdder(async(function (n) {
    n.should().beEqual(5);
  }));
}).
it ("Should handle multiple arguments", function (async) {

  asyncTest(async(function(val1,val2){
    val1.should().beTrue();
    val2.should().beFalse();
  }));
    
 });
