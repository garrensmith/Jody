var describe = require('Jody').describe,
    describe_under_test = require('../lib/Jody').describe,
    specs = require('../lib/Jody').specs;

var createdSpecCase
describe("Describe").
  beforeEach( function () {
    describe_under_test("example spec");
    
    createdSpecCase = specs.pop();
  }).
  it("Should set specified description", function () {
    createdSpecCase.desc.should().beEqual("example spec");
  }).
  it("Should create empty array of specs", function () {
    createdSpecCase.specs.length.should().beEqual(0);
  });


describe("Describe with a beforeEach").
  it("Should create beforeEachMethod", function () {
    var beforeEachFunction = function () {};
    
    describe_under_test("example spec with beforeEach").
      beforeEach(beforeEachFunction);
    
    var specCase = specs.pop();

    specCase.beforeEachMethodBody.should().beEqual(beforeEachFunction);
  });


var specCase = function () {},
    spec_under_test,
    itFunction = function () {};
describe("Describe with new spec").
  beforeEach(function () {
    
    describe_under_test("example spec with spec").
      it("example spec", itFunction);

    specCase = specs.pop();
    spec_under_test = specCase.specs[0];
  }).
  it("Should add spec to array of specs", function () {
    specCase.specs.length.should().beEqual(1);
  }).
  it("Should set spec description", function () {
    
    spec_under_test.desc.should().beEqual("example spec");
  }).
  it("Should set the spec method body", function () {
    spec_under_test.methodBody.should().beEqual(itFunction);
  }).
  it("Should set spec failed until proven passed", function () {
    spec_under_test.passed.should().beFalse();
  }).
  it("Should contain empty error message", function () {
    spec_under_test.error.should().beEqual("");
  });


describe("Describe spec with After all").
  it("Should create after all method", function () {
    var afterAllFunction = function () {};

    describe_under_test("example spec with after all").
      it("a spec", function () {}).
      afterAll(afterAllFunction);

    var specCase = specs.pop();

    specCase.afterAllMethodBody.should().beEqual(afterAllFunction);
  });

describe("Describe spec with before All").
  it("Should create before method body", function () {
    var beforeAllFunction = function () {};

    describe_under_test("example spec with after all").
      beforeAll(beforeAllFunction).
      it("a spec", function () {})
      

    var specCase = specs.pop();

    specCase.beforeAllMethodBody.should().beEqual(beforeAllFunction);

  });
  
