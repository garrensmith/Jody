var reporter = require('./spec_reporter');

var drawDots = function (desc, max_dots) {
  var i = 0, dots = "";
  for (i = 0; i < (max_dots - desc.length); i += 1) {
    dots = dots + '.';
  }
  return dots;
};

var specs = require('./spec_my_node.js').specs;

var totalSpecs  = 0,
    failedSpecs = 0,
    passedSpecs = 0;

var runSpecCase = function (specCase) {
  var result = "\033[32mpassed\033[0m";;

  console.log(specCase.desc + ':');

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
      passedSpecs += 1;
      reporter.passedSpec(totalSpecs, spec.desc)
    } catch (e)
    {
      console.log(spec.desc + ': \n    '  + e);
 //     result = "\033[31mfailed!\033[0m";
      failedSpecs += 1;
      reporter.failedSpec(totalSpecs, spec.desc, e);
    }
 //   console.log('    ' + spec.desc + drawDots(spec.desc, 50)  + result);
  });
};

var runAllSpecs= exports.runAllSpecs = function () {
  specs.forEach( function (spec) {
    runSpecCase(spec);
  });  

  exports.totalSpecs = totalSpecs;
  exports.failedSpecs = failedSpecs;
  exports.passedSpecs = passedSpecs;
};

