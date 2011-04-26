var describe = require("Jody").describe,
    reporter = require("../lib/reporter");

describe("Colourise output").
  it("Should make passed output green", function () {
    var passed = true;
    
    reporter.colouriseResult(passed).should().beEqual("\033[32mpassed\033[0m");
  }).
  it("Should make failed output red", function () {
    var failed = false;

    reporter.colouriseResult(failed).should().beEqual("\033[31mfailed!\033[0m");
  });

describe("Spec formatting").
  it("Calculate number of dots for equal output", function () {
    var totalLetters = 30;
    var test = "hello";
    var requiredDots = totalLetters - test.length - 1;

    reporter.drawDots(test, totalLetters).length.should().beEqual(requiredDots);
  }).
  it("Should output dots", function () {
    var result = reporter.drawDots("test", 10);
    result.should().beEqual('.....');
  });

// not sure if more specs are required
