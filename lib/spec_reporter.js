var inspect = require('sys').inspect;
var specs = require('./spec_my_node.js').specs;
reporter = exports;

// utils
var colouriseResult = function (passed) {
  if(passed) {
    return "\033[32mpassed\033[0m";
  }
  else {
    return "\033[31mfailed!\033[0m";
  }
};

var drawDots = function (desc, max_dots) {
  var i = 0, dots = "";
  for (i = 0; i < (max_dots - desc.length); i += 1) {
    dots = dots + '.';
  }
  return dots;
};

//

var totalSpecs = 0,
    failedSpecs = 0;

reporter.displayResults = function () {
  console.log('Spec My Node Results:'); 

  specs.forEach(function (specCase) {
   console.log('\n' + specCase.desc);
   specCase.specs.forEach(function (spec) {
     totalSpecs += 1;
      console.log('    ' + spec.desc + drawDots(spec.desc, 90)  + colouriseResult(spec.passed));
      if(!spec.passed) {
        failedSpecs += 1;
        console.log('        error: ' + spec.error);
      }
   });
  });
  
  console.log('\n' +  totalSpecs + ' Examples ' + failedSpecs + ' failed ' + (totalSpecs - failedSpecs) + ' passed\n'); 
};

