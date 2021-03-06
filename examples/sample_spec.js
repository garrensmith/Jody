var describe = require('Jody').describe;
var assert = require("assert");

describe("Test 1").it("Should pass",function () {
  assert.equal(1,1);
});

describe("Test 2").
  it("Should fail",function () {
  assert.equal(1,2);
}).
  afterAll(function (done) {
    console.log("Woohoo");
    done();
  });

var value = 0;
describe("Before Test").beforeEach (function (done) {
  value = 2;
  done();
}).it ("Should run before to pass", function () { 
  console.log("before test test");
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

});

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
  }).
  it("Should fail as item not in array", function () {
    var test = [1,2,4];

    test.should().contain(3);
  });

var beforeAllCounter = 0;

describe("Before All").
  beforeAll(function (done) {
    beforeAllCounter += 1;
    done();
  }).
  it("One before all ", function () {
    beforeAllCounter.should().beEqual(1);
  }).
  it("One before all ", function () {
    beforeAllCounter.should().beEqual(1);
  })


describe("After All").
  it("Should reset variable after all finished", function (async) {
    setTimeout(async(function () {
      console.log("timeout");
    }), 200);
  }).
  afterAll(function (done) {
    console.log("after all called");
    done();
  });


