var assert = require('assert');
var sys = require('sys');

var print = exports.print = function (msg) {
  console.log(msg);
};

// utils
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}


//////
var specs = [];
var current_spec = function () {};

var spec =  {
  desc : "",
  methodBody : function () {}
};

var specCase =  {
  desc : "",
  specs : [],
  beforeEachMethodBody : function() {},
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
  //console.log(sys.inspect(current_spec));

  return current_spec;
};

var runAllSpecs = function () {
  var total = 0;

  for (var i = 0; i < specs.length; i++) {
    runSpecCase(specs[i]);
  }

 /* currentSpecCase = 
    console.log(sys.inspect(currentSpecCase.specs));

  console.log(currentSpecCase.desc);
  for (var i = 0; i < currentSpecCase.specs.length; i++) {
    try {
       // console.log(sys.inspect(currentSpecCase.beforeEach()));
       console.log(currentSpecCase.specs[i].desc);
       currentSpecCase.specs[i].methodBody();
        console.log(sys.inspect(currentSpecCase.specs[i]));
      } catch (e)
      {
        console.log(e);
        //result = "\033[31mfailed!\033[0m";
        //failedTests++;
      }
  }*/
}

var draw_dots = function(desc, max_dots) {
  var dots = "";
  for (var i = 0; i < (max_dots - desc.length); i++) {
    dots = dots + '.';
  }
  return dots;

};

var runSpecCase = function (specCase) {
  var result = "passed";
  console.log(specCase.desc + ':');
  for (var j = 0; j < specCase.specs.length; j++) {
      try {
        specCase.beforeEachMethodBody();
        specCase.specs[j].methodBody();
      } catch (e)
      {
        console.log(specCase.specs[j].desc + ': ' + e);
        result = "\033[31mfailed!\033[0m";
        //failedTests++;
      }
      print('    ' + specCase.specs[j].desc + draw_dots(specCase.specs[j].desc, 30)  + result);
  }
};

/*var runTests = function () {
  var failedTests = 0;
  console.log(sys.inspect(specs));
  for (var i = 0; i < specs.length; i++) {
    var result = "passed", specCase = specs[i];
    console.log(specCase.desc);

    for (var j = 0; j < specCase.specs.length; j++) {
      try {
        specCase.beforeEach();
        specCase.specs[j]();
      } catch (e)
      {
        console.log(specCase.specs[j].desc + ': ' + e);
        result = "\033[31mfailed!\033[0m";
        failedTests++;
      }
      print(specCase.specs[j].desc + '........' + result);

    }

  }
  console.log('Total Tests: ' + specs.length + ' Failed Tests: ' + failedTests);
};*/

process.addListener('exit', function () {
  console.log('Spec My Node Results:'); 
  runAllSpecs();
});

