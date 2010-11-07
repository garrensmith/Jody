var runner = require('../lib/spec_runner');
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

describe("Run spec").
  beforeEach( function () {
        var specCase = function() {};
    
    specCase.desc = "test";
    specCase.beforeEachMethodBody = function () {
      beforeCalled = true;
    };
    
    var spec =  {
      desc : "",
      methodBody : function () {
        specCalled = true;
      },
      passed : false,
      error : ""
    };


    specCase.specs = [spec];

    runner.runSpecCase(specCase);

  }).
  it("Should call the before method", function () {
    beforeCalled.should().beTrue();
  }).
  it("Should run Spec", function () {
     specCalled.should().beTrue();
  });
;

