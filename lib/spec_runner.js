var reporter = require('./spec_reporter');
var specs = require('./spec_my_node.js').specs;

var runSpecCase = function (specCase) {
  //console.log(specCase.desc + ':');
  var totalSpecs = 0;
  reporter.specCaseLog(specCase.desc);
  specCase.specs.forEach( function (spec) { 
    try {
      totalSpecs += 1;
      specCase.beforeEachMethodBody();
      spec.methodBody(function (fn) {
        process.addListener('evalCallbacks', function(){
          try {
            fn();
          } catch (e) {
            reporter.failedSpec(totalSpecs, specCase.desc, e)
          }
        });        
      });
      reporter.passedSpec(totalSpecs, spec.desc)
    } catch (e)
    {
      reporter.failedSpec(totalSpecs, spec.desc, e);
    }
  });
};

var runAllSpecs= exports.runAllSpecs = function () {
  specs.forEach( function (spec) {
    runSpecCase(spec);
  });  
};

// event emitter should be in runner


