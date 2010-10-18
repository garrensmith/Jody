var sys = require('sys');
var assert = require('assert');

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

Object.should = function () {
  

};

assert.throw = function (action) {
  var didThrow = false;
  
  try {
    action();
  }catch (e) {
    didThrow = true;
  }

  if (!didThrow) {
    throw {
      message : "Did not throw exception"
    }
  }

}


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


var runSpecCase = function (specCase) {
  var j = 0, result = "passed";

  console.log(specCase.desc + ':');

  for (j = 0; j < specCase.specs.length; j += 1) {
    try {
      specCase.beforeEachMethodBody();
      specCase.specs[j].methodBody();
    } catch (e)
    {
      console.log(specCase.specs[j].desc + ': ' + e);
      result = "\033[31mfailed!\033[0m";
      //failedTests++;
    }
    print('    ' + specCase.specs[j].desc + draw_dots(specCase.specs[j].desc, 50)  + result);
  }
};

var runAllSpecs = function () {
  var total = 0, i;

  for (i = 0; i < specs.length; i += 1) {
    runSpecCase(specs[i]);
  }

};



process.addListener('exit', function () {
  console.log('Spec My Node Results:'); 
  runAllSpecs();
});

