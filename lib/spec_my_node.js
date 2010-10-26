var sys = require('sys');
require('./matchers.js'); 

var specs = exports.specs = [];

var spec =  {
  desc : "",
  methodBody : function () {},
  passed : false,
  error : ""
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
          var newSpec = Object.create(spec);
          newSpec.desc = desc;
          newSpec.methodBody = methodBody;
          this.specs.push(newSpec);
          return this;
        },  
};

var describe = exports.describe = function (description) {
  var current_spec = Object.create(specCase);
  current_spec.specs = []; // clear old specs??
  current_spec.desc = description;
  specs.push(current_spec);

  return current_spec;
};





