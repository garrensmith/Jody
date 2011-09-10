var events = require('events');

var specification_groups =  [];

var Specification = function(desc, fn) {
  var self = this;
  
  self.desc = desc;
  self.fn = fn;
  self.passed = "unset";
  self.error = function (){};
  self.active_asyncs = 0;
 
};

var SpecificationGroup =  function (description) {
  var self = this;

  events.EventEmitter.call(this);

  self.desc = description;

  self.specs = [];
  self.active_specs = 0;

  self.beforeEachFn = function (done) { done(); };
  self.afterAllFn =   function (done) { done(); };
  self.afterEachFn =  function (done) { done(); };
  self.beforeAllFn =  function (done) { done(); };

  self.beforeEach = function (fn) {
    self.beforeEachFn = fn;
    return self;
  };
  
  self.afterEach = function (fn) {
    self.afterEachFn = fn;
    return self;
  };

  self.beforeAll = function (fn) {
    self.beforeAllFn = fn;
    return self;
  };

  self.it = function (desc, fn) {
    var specification = new Specification(desc, fn);

    self.specs.push(specification);

    self.active_specs += 1;

    return self;
  };

  

  self.afterAll = function (Fn) {
    self.afterAllFn = Fn;
    return self;
  };
};

require('sys').inherits(SpecificationGroup, events.EventEmitter);

var describe =  function (description, fn) {
  var current_spec = new SpecificationGroup(description);

  specification_groups.push(current_spec);

  if (fn) {
    fn(current_spec);
  };

  return current_spec;
};

exports.Specification = Specification;
exports.SpecCase = SpecificationGroup;

exports.describe = describe;
exports.specification_groups = specification_groups;
exports.HttpClient = require('./HttpClient');

exports.configure = {};
exports.configure.beforeAll = function (fn) {
  exports.configure.beforeAllFn =  fn;
};

exports.configure.afterAll = function (fn) {
  exports.configure.afterAllFn =  fn;
};







