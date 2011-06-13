var specification_groups = require('./Jody.js').specification_groups;
var reporter = exports;

// utils
var colouriseResult = exports.colouriseResult = function (passed) {
  if(passed) {
    return "\033[32mpassed\033[0m";
  }
  else {
    return "\033[31mfailed!\033[0m";
  }
};

var drawDots = exports.drawDots = function (desc, max_dots) {
   return Array(max_dots - desc.length).join(".");
};

//

var totalSpecs = 0,
    failedSpecs = 0;


reporter.displayResults = function () {
  console.log('Jody Results:'); 

  specification_groups.forEach(function (spec_group) {
   console.log('\n' + spec_group.desc);
   spec_group.specs.forEach(function (spec) {
     totalSpecs += 1;
      console.log('    ' + spec.desc + drawDots(spec.desc, 90)  + colouriseResult(spec.passed));
      if(!spec.passed) {
        failedSpecs += 1;        
        if (spec.error.message !== undefined){
          console.log('        error: ' + spec.error.message);
        } 
        else {
          console.log('        error: ' + spec.error);
        }
        
        if (spec.error.stack) {
          //console.log('        stack: ' + spec.error.stack);  
        }
      }
   });
  });
  
  reporter.failedSpecs = failedSpecs;
  console.log('\n %s Examples %s Failed %s Passed\n', totalSpecs,  failedSpecs, (totalSpecs - failedSpecs)); 
};

