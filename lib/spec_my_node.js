var sys = require('sys');
var assert = require('assert');
require('./matchers.js'); 

var print = exports.print = function (msg) {
  console.log(msg);
};

var specs = [];
var current_spec = function () {};

var spec =  {
  desc : "",
  methodBody : function () {}
};

var specCase =  {
  desc : "",
  specs : [],
  beforeEachMethodBody : function () {},
  beforeEach : function (methodBody) {
    this.beforeEachMethodBody = methodBody;
    return this;
  },

  it : function (desc, methodBody) {
          var this_spec = Object.create(spec);
          this_spec.desc = desc;
          this_spec.methodBody = methodBody;
          this.specs.push(this_spec);
          return this;
        },  
};

var describe = exports.describe = function (description) {
  current_spec = Object.create(specCase);
  current_spec.specs = []; // clear old specs??
  current_spec.desc = description;
  specs.push(current_spec);

  return current_spec;
};

var draw_dots = function (desc, max_dots) {
  var i = 0, dots = "";
  for (i = 0; i < (max_dots - desc.length); i += 1) {
    dots = dots + '.';
  }
  return dots;

};

var totalSpecs = 0,
    failedSpecs = 0,
    passedSpecs = 0;

var runSpecCase = function (specCase) {
  var j = 0, result = result = "\033[32mpassed\033[0m";;

  console.log(specCase.desc + ':');

  specCase.specs.forEach( function (spec) { 
  try {
      totalSpecs += 1;
      specCase.beforeEachMethodBody();
      spec.methodBody();
      passedSpecs += 1;
    } catch (e)
    {
      console.log(specCase.specs[j].desc + ': ' + e);
      result = "\033[31mfailed!\033[0m";
      failedSpecs += 1;
    }
    print('    ' + spec.desc + draw_dots(spec.desc, 50)  + result);
  });
};

var runAllSpecs = function () {
  var total = 0, i;
  specs.forEach( function (spec) {
    runSpecCase(spec);
  });  
};



process.addListener('exit', function () {
  console.log('Spec My Node Results:'); 
  runAllSpecs();
  console.log("\n" + totalSpecs + " Examples, " + failedSpecs + " failed, " + passedSpecs + " passed\n");
});

