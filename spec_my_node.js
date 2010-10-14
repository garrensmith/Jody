var assert = require('assert')
var sys = require('sys')

var specs = [];

var describe = exports.describe = function(description){
  return describe;
};

describe.it = function(name, spec){
  console.log('run ' + name);
  specs.push(spec)
};

var runTests = function() {
  for (var i = 0; i < specs.length; i++){
    specs[i]();
  };
};

process.addListener('exit', function() {
   console.log('run specs...'); 
   runTests();
})

