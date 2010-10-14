var assert = require('assert')
var sys = require('sys')

if(typeof Object.create !== 'function'){
  Object.create = function(o){
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}

var specCase = function(){};
specCase.desc = "";
specCase.spec = function(){};

var specs = [];

var describe = exports.describe = function(description){
  return describe;
};

describe.it = function(desc, spec){
  console.log('adding ' + desc);
  var new_spec = Object.create(specCase); 
  new_spec.desc = desc;
  new_spec.spec = spec;
  specs.push(new_spec)
};

var runTests = function() {
  
  for (var i = 0; i < specs.length; i++){
    var result = "passed";
    var specCase = specs[i];

    try{
    specCase.spec();
    } catch(e)
    {
      result = "failed!";
    }

    console.log(specCase.desc + '........' + result);

  };
};

process.addListener('exit', function() {
  console.log('run specs...'); 
  runTests();
})

