var events = require('events');

var specs =  [];

var Spec = function(desc, methodBody) {
  events.EventEmitter.call(this);

  var self = this;

  self.desc = desc;
  self.methodBody = methodBody;
  self.passed = "unset";
  self.error = function (){};
  self.active_asyncs = 0;

  self.async_complete  = function () {
    self.active_asyncs -= 1;
    self.check_if_done();
  }

  self.check_if_done = function () {

    if (self.active_asyncs !== 0) { return;};

    self.emit('done');
  };
};

require('sys').inherits(Spec, events.EventEmitter);

var SpecCase =  function (description) {
  var self = this;

  events.EventEmitter.call(this);

  self.desc = description;

  self.specs = [];
  self.active_specs = 0;

  self.beforeEachMethodBody = function () {};
  self.afterAllMethodBody = function (cb) {cb();};
  self.beforeAllMethodBody = function () {};

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
    newSpec.on('done', function () {
      self.active_specs -= 1;

      if (self.active_specs !== 0) { return ;}
      var doneCalled = false;

      setTimeout(function () {
        if (!doneCalled) {
          self.emit('done');
        }
      }, 2000);

      try{
        self.afterAllMethodBody(function () {
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
    });

    self.specs.push(newSpec);

    self.active_specs += 1;

    return self;
  };

  self.afterAll = function (methodBody) {
    self.afterAllMethodBody = methodBody;
    return self;
  };
};

require('sys').inherits(SpecCase, events.EventEmitter);


var describe =  function (description) {
  var current_spec = new SpecCase(description);

  specs.push(current_spec);
  return current_spec;
};

exports.Spec = Spec;
exports.SpecCase = SpecCase;

exports.describe = describe;
exports.specs = specs;
exports.HttpClient = require('./HttpClient');
exports.configure = {
  beforeAllSpecsMethodBody :  function (cb) {cb()},
  afterAllSpecsMethodBody :  function (cb) {cb()}
        };

exports.configure.beforeAllSpecs = function (methodBody) {
  exports.configure.beforeAllSpecsMethodBody =  methodBody;
};

exports.configure.afterAllSpecs = function (methodBody) {
  exports.configure.afterAllSpecsMethodBody =  methodBody;
};







