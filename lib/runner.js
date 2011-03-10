var reporter = require('./reporter');
var specs = require('./Jody.js').specs;

var runSpecCase = exports.runSpecCase = function (specCase) {
  specCase.beforeAllMethodBody();

  specCase.specs.forEach( function (spec) { 
    try {
      specCase.beforeEachMethodBody();

      spec.methodBody(function (fn) {
        spec.active_asyncs += 1;
        return function() {
          try {
            fn(arguments[0],arguments[1],arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]); // super hacky need a fix for this, but only way to pass through multiple arguments with else passing through an array
          } catch(e) {
            spec.passed = false;
            spec.error = e;
            //console.dir(e);
          }

          spec.check_if_done();

        }
      }  );

      if (spec.error === "") {
        spec.passed = true;
        spec.check_if_done();
      }

    } catch (e)  {
      spec.passed = false;
      spec.error = e;
    }

  });

};



var runAllSpecs= exports.runAllSpecs = function () {
  specs.forEach( function (spec) {
    runSpecCase(spec);
  });  
};

var processCallbacks = exports.processCallbacks = function () {

  specs.forEach( function (specCase) {
    specCase.afterAllMethodBody();
  });

};



