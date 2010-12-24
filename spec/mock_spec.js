var describe = require("Jody").describe,
    mock = require("../lib/mock.js");

  var fsMock = mock("fs"),
      fs = require('fs');

describe("Node Standard Lib").
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
