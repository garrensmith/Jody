var reporter = require('./reporter');
var specs = require('./Jody.js').specs;

var runSpecCase = exports.runSpecCase = function (specCase) {
  var hasCallback = false;
  specCase.beforeAllMethodBody();
  specCase.specs.forEach( function (spec) { 
    try {
      specCase.beforeEachMethodBody();

      spec.methodBody(function (fn) {

        return function() {
          try {
            fn(arguments[0],arguments[1],arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]); // need a fix for this, but only way to pass through multiple arguments
          } catch(e) {
            spec.passed = false;
            spec.error = e;
          }
        };

        try {
          fn();
        } catch (e) {
          spec.passed = false;
          spec.error = e;
        }
      });

      spec.passed = true;
    } catch (e)
    {
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
 // process.emit('evalCallbacks');
  specs.forEach( function (specCase) {
    specCase.afterAllMethodBody();
  });

};



