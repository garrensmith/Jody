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

var addSpecResultToResults = function (id, desc, passed, err) {
  var newSpecResult = Object.create(specResult);
  newSpecResult.id = id;
  newSpecResult.description = desc;
  newSpecResult.passed = passed;

  if(!passed) {
    newSpecResult.err = err;
  }

  results.push(newSpecResult);
};

var findResult = function (id) {
  
  results.forEach(function (result) {
    if (result.id === id) {
      return result;
    }
  });

  return undefined;
}

reporter.passedSpec = function (id, desc) {
  addSpecResultToResults(id, desc, true);
}


reporter.failedSpec = function (id, desc, err) {
  console.log("failed");
  var result = findResult(id);
  if (result === undefined) {
     addSpecResultToResults(id, desc, false, err);
     console.log("not found");
  }
  else {
    result.passed = false;
    result.err = err;    
    console.log("foud");
  }
  
}

reporter.displayResults = function () {
  var totalSpecs = results.length,
      failedSpecs = 0;
  //console.log(inspect(results));
  console.log('Spec My Node Results:'); 
  results.forEach(function (report) {
    console.log('    ' + report.description + drawDots(report.description, 50)  + colouriseResult(report.passed));
  });

  console.log("\n" +  totalSpecs + " Examples, " + failedSpecs + " failed, " + (totalSpecs - failedSpecs) + " passed\n");
  //console.log(inspect(results));
}


//rather have two arrays one for pass and one for fail. If it fails in passed move over to passed
