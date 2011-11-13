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
  
  specification_groups.forEach(function (spec_group) {
    spec_group.specs.forEach(function (spec) {
      if(spec.passed !== true) {
        console.log('    \033[31m' + spec.desc + '\033[0m');
        failedSpecs += 1;        
        if (spec.error.message !== undefined){
          console.log('        error: ' + spec.error.message);
        } 
        else {
          //console.log('        error: ' + spec.error);
        }
        
        if (spec.error.stack) {
          console.log('\nStacktrace:')
          console.log(spec.error.stack);  
        }
      } 
   });
  });
   
   console.log('\n \n');
   console.log('Jody Results:'); 

  specification_groups.forEach(function (spec_group) {
   console.log('\n' + spec_group.desc);
   
   spec_group.specs.forEach(function (spec) {
     totalSpecs += 1;
      var color = spec.passed === true ? true : false

      console.log('    ' + spec.desc + drawDots(spec.desc, 90)  + colouriseResult(color));      
      if (spec.passed === 'unset') {
        console.log('        error: Spec not run');
      }
      if(spec.passed === false) {
         if (spec.error.message !== undefined){
          console.log('        error: ' + spec.error.message);
        } 
        else {
          console.log('        error: ' + spec.error);
        }       
      }
   });
  });
  
  reporter.failedSpecs = failedSpecs;
  console.log('\n %s Examples %s Failed %s Passed\n', totalSpecs,  failedSpecs, (totalSpecs - failedSpecs)); 
};

function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  } else {
    console.log('dumpError :: argument is not an object');
  }
}

