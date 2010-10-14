var spec = require('../lib/spec_my_node.js')
var assert = require("assert");
var inspect = require('sys').inspect;
console.log("running");
//console.log(inspect(spec.describe));

spec.describe("Test 1").it("Should pass",function(){
  assert.equal(1,1);
});

spec.describe("Test 2").it("Should fail",function(){
  assert.equal(1,2);
});

var value = 0;
spec.describe("Before Test").beforeEach (function (){
  value = 2;
}).it ("Should run before", function () { 
  assert.equal(value,2);
});
