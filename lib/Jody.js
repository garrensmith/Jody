var events = require('events');

var specs =  [];

var Spec = function(desc, methodBody) {
  events.EventEmitter.call(this);

  var self = this;

  self.desc = desc,
  self.methodBody = methodBody,
  self.passed = false,
  self.error = ""
  self.active_asyncs = 0;

  self.check_if_done = function () {
    if (self.active_asyncs !== 0) { return;};
    self.emit('done');
  };
};

require('sys').inherits(Spec, events.EventEmitter);

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

exports.Spec = Spec;
exports.describe = describe;
exports.specs = specs
exports.HttpClient = require('./HttpClient');






