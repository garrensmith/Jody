var assert = require('assert');
var sys = require('sys');

if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}

var specCase = function () {};
specCase.desc = "";
specCase.spec = function () {};
specCase.beforeEach = function () {};

var specs = [];
var current_spec = function () {};

var describe = exports.describe = function (description) {
  current_spec = Object.create(specCase);
  specs.push(current_spec);
  
  return describe;
};

var createSpecCase = function (desc, spec) {
    
  return current_spec;
};

describe.beforeEach = function (setup) {
  current_spec.beforeEach = setup;
  return describe;
};

describe.it = function (desc, spec) {
  current_spec.desc = desc;
  current_spec.spec = spec;
};

var runTests = function () {
  var failedTests = 0;
  
  for (var i = 0; i < specs.length; i++) {
    var result = "passed", specCase = specs[i];
    try {
      specCase.beforeEach();
      specCase.spec();
    } catch (e)
    {
      result = "\033[31mfailed!\033[0m";
      failedTests++;
    }

    console.log(specCase.desc + '........' + result);
  }

  console.log('Total Tests: ' + specs.length + ' Failed Tests: ' + failedTests);
};

process.addListener('exit', function () {
  console.log('Spec My Node Results:'); 
  runTests();
});

