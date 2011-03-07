
exports.HttpClient = require('./HttpClient');



var specs = exports.specs = [];

var spec =  {
  desc : "",
  methodBody : function () {},
  passed : false,
  error : ""
};

var SpecCase =  function () {
  var self = this;
  self.desc = "";
  
  self.specs = [];
  
  self.beforeEachMethodBody = function () {},
  self.afterAllMethodBody = function () {},
  self.beforeAllMethodBody = function () {},
  
  self.beforeEach = function (methodBody) {
    self.beforeEachMethodBody = methodBody;
    return self;
  };

  self.beforeAll = function (methodBody) {
    self.beforeAllMethodBody = methodBody;
    return self;
  };

  self.it = function (desc, methodBody) {
          var newSpec = Object.create(spec);
          newSpec.desc = desc;
          newSpec.methodBody = methodBody;
          self.specs.push(newSpec);
          return self;
        }, 

  self.afterAll = function (methodBody) {
              self.afterAllMethodBody = methodBody;
              return self;
             }
};

var describe = exports.describe = function (description) {
  var current_spec = new SpecCase();
  current_spec.desc = description;
  specs.push(current_spec);

  return current_spec;
};





