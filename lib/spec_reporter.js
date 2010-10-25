var inspect = require('sys').inspect;

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


reporter = exports;

specResult = {
  id : 0,
  passed : false,
  description : "",
  err : ""
};

specCaseResult = {
  description : "",
  specResults : []
};

var results = [];
var failedSpecs = 0;
var currentSpecCaseResult;


var addSpecResultToResults = function (id, desc, passed, err) {
  var newSpecResult = Object.create(specResult);
  newSpecResult.id = id;
  newSpecResult.description = desc;
  newSpecResult.passed = passed;

  if(!passed) {
    newSpecResult.err = err;
  }

  currentSpecCaseResult.specResults.push(newSpecResult);
};

var findResult = function (id) {

  results.forEach(function (result) {
    if (result.id === id) {
      return result;
    }
  });

  return undefined;
}

reporter.specCaseLog = function (desc) {
  currentSpecCaseResult = Object.create(specCaseResult);
  currentSpecCaseResult.specResults = [];
  currentSpecCaseResult.description = desc;
  results.push(currentSpecCaseResult);
}

reporter.passedSpec = function (id, desc) {
  addSpecResultToResults(id, desc, true);
};

reporter.failedSpec = function (id, desc, err) {
  failedSpecs += 1;
  var result = findResult(id);
  if (result === undefined) {
    addSpecResultToResults(id, desc, false, err);
  }
  else {
    result.passed = false;
    result.err = err;    
  }
};

reporter.displayResults = function () {
  var totalSpecs = results.length

  console.log('Spec My Node Results:'); 
  results.forEach(function (specCaseResult) {
    console.log(specCaseResult.description);
    specCaseResult.specResults.forEach(function (report) {
      console.log('    ' + report.description + drawDots(report.description, 90)  + colouriseResult(report.passed));
    });
  });


  console.log("\n" +  totalSpecs + " Examples, " + failedSpecs + " failed, " + (totalSpecs - failedSpecs) + " passed\n");
};


