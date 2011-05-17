var events = require('events');

var specification_groups =  [];

var Specification = function(desc, Fn) {
  var self = this;
  
  events.EventEmitter.call(this);

  self.desc = desc;
  self.Fn = Fn;
  self.passed = "unset";
  self.error = function (){};
  self.active_asyncs = 0;

  self.async_complete  = function () {
    self.active_asyncs -= 1;
    self.check_if_done();
  };

  self.check_if_done = function () {

    if (self.active_asyncs !== 0) { return;}

    self.emit('done');
  };
};

require('sys').inherits(Specification, events.EventEmitter);

var SpecificationGroup =  function (description) {
  var self = this;

  events.EventEmitter.call(this);

  self.desc = description;

  self.specs = [];
  self.active_specs = 0;

  self.beforeEachFn = function () {};
  self.afterAllFn = function (cb) {cb();};
  self.beforeAllFn = function () {};

  self.beforeEach = function (fn) {
    self.beforeEachFn = fn;
    return self;
  };

  self.beforeAll = function (fn) {
    self.beforeAllFn = fn;
    return self;
  };

  self.it = function (desc, fn) {
    var specification = new Specification(desc, fn);
    
/*    specification.on('done', function () {
      self.active_specs -= 1;

      if (self.active_specs !== 0) { return ;}
      var doneCalled = false;

      setTimeout(function () {
        if (!doneCalled) {
          self.emit('done');
        }
      }, 2000);

      try{
        self.afterAllFn(function () {
          doneCalled = true;
          self.emit('done');
        });
      } catch (e) {
        self.specs.forEach(function ( spec) {
          spec.passed = false;
          spec.error = {
            message: "Failed in After all " + e
          };

        });
      }
    });*/

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


var describe =  function (description) {
  var current_spec = new SpecificationGroup(description);

  specification_groups.push(current_spec);
  return current_spec;
};

exports.Specification = Specification;
exports.SpecCase = SpecificationGroup;

exports.describe = describe;
exports.specification_groups = specification_groups;
//exports.HttpClient = require('./HttpClient');

exports.configure = {};
exports.configure.beforeAll = function (fn) {
  exports.configure.beforeAllFn =  fn;
};

exports.configure.afterAll = function (fn) {
  exports.configure.afterAllFn =  fn;
};







