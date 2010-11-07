var runner = require('../lib/runner');
var describe = require('Jody').describe;

/*describe("Run all Specs").
  it("Should run all created specs", function () {
    var specs = require('../lib/Jody.js').specs,
        specsRun = 0;
    
    //console.dir(specs);
    //specs.push(function () {});
    specs.forEach(function (dd) {
     // console.log(dd);
    });

   /* runner.runSpecCase = function (spec) {
      console.log("hello");
    };*/

 /*   runner.runAllSpecs();
    
    specsRun.should().beEqual(2);
  });*/

var beforeCalled = false;
var specCalled = false;
var specFail = function () {};
var specPass = function () {};

describe("Spec Runner").
  beforeEach( function () {
        var specCase = function() {};
    
    specCase.desc = "test";
    specCase.beforeEachMethodBody = function () {
      beforeCalled = true;
    };
    
    specPass =  {
      desc : "",
      methodBody : function () {
        specCalled = true;
      },
      passed : false,
      error : ""
    };

      specFail =  {
      desc : "",
      methodBody : function () {
        throw {
          message: "error"
        };
      },
      passed : false,
      error : ""
    };

    specCase.specs = [specPass, specFail];

    runner.runSpecCase(specCase);

  }).
  it("Should call the before method", function () {
    beforeCalled.should().beTrue();
  }).
  it("Should run Spec function", function () {
    specCalled.should().beTrue();
    specPass.passed.should().beTrue();
  }).
  it("Should catch failing test", function () {
    specFail.passed.should().beFalse();
    specFail.error.message.should().beEqual("error");
  });
;

