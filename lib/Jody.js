
var specs =  [];

var Spec = function(desc, methodBody) {
  this.desc = desc,
  this.methodBody = methodBody,
  this.passed = false,
  this.error = ""
};

var SpecCase =  function (description) {
  var self = this;
  self.desc = description;
  
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
          var newSpec = new Spec(desc, methodBody);

          self.specs.push(newSpec);
          return self;
        }, 

  self.afterAll = function (methodBody) {
              self.afterAllMethodBody = methodBody;
              return self;
             }
};


var describe =  function (description) {
  var current_spec = new SpecCase(description);

  specs.push(current_spec);
  return current_spec;
};


exports.describe = describe;
exports.specs = specs
exports.HttpClient = require('./HttpClient');






