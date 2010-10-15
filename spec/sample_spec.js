var describe = require('../lib/spec_my_node.js').describe
var assert = require("assert");
var inspect = require('sys').inspect;
console.log("running");
//console.log(inspect(spec.describe));

describe("Passing Tests").it("Should pass",function(){
  assert.equal(1,1);
});

describe("Test 2").it("Should fail",function(){
  assert.equal(1,2);
});

var value = 0;
describe("Before Test").beforeEach (function (){
  value = 2;
}).it ("Should run before to pass", function () { 
  assert.equal(value,2);
});

describe("Multiple tests in context").
  it("First in context", function () {
    assert.equal(2,2);
  }).
  it("Second in context", function () {
    assert.equal(2,2);
  });



