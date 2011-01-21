var reporter = require('./reporter');
var specs = require('./Jody.js').specs;

var runSpecCase = exports.runSpecCase = function (specCase) {
  var hasCallback = false;
  specCase.beforeAllMethodBody();
  specCase.specs.forEach( function (spec) { 
    try {
      specCase.beforeEachMethodBody();
      spec.methodBody(function (fn) {
        process.addListener('evalCallbacks', function(){
          try {
            fn();
          } catch (e) {
            spec.passed = false;
            spec.error = e;
          }
        });        
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
  process.emit('evalCallbacks');
  specs.forEach( function (specCase) {
    specCase.afterAllMethodBody();
  });

};



