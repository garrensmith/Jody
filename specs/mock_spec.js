var describe = require("Jody").describe,
    mock = require("../lib/mock.js"),
    fs, 
    fsMock;

describe("Mock node Standard Lib").
  beforeEach(function () {
    fsMock = mock("fs");
    fs = require('fs');
  }).
  it("Should replace standard module", function () {
      
    fs.should().beEqual(fsMock);

  }).
  it("Should call mock methods", function () 
  {
    mockWasCalled = false;
    
    fsMock.readdir = function (path, cb) {
      mockWasCalled = true;
    };

    fs.readdir("a path", function () {});
     
    mockWasCalled.should().beTrue();
  });


describe("Mock user created lib").
  it("Should replace lib in require", function () {
    var runnerMock = mock("../lib/runner.js"),
        mockWasCalled = false;

    runnerMock.runAllSpecs = function () {
      mockWasCalled = true;
    }

    var runner = require("../lib/runner.js");
    runner.runAllSpecs();

    mockWasCalled.should().beTrue();    
 
  });
