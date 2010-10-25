var describe = require('../lib/spec_my_node.js').describe
var assert = require("assert");
var inspect = require('sys').inspect;

describe("Test 1").it("Should pass",function(){
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

describe("Matchers and should").
it("Should be able to use should to assert a passing test", function () {
  var testString = "hello";
  testString.should().beEqual("hello");

}).
it("Should assert failing test", function () {
  var testObj = function () { };
  testObj.voice = "blah";

  testObj.voice.should().beEqual("hello");

});;

describe("Exception").
it("Should throw exception", function () {
  (function () {
    throw { message: "My exception" }
  }).should().throwError();
}).
it("Should fail as no exception thrown", function () {
  (function () {
  }).should().throwError();
})

describe("Array matchers").
  it("Should check for containing item", function () {
    var test = [1,2,3,4];

    test.should().contain(3);
  });

