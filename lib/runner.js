var events = require('events'),
    reporter = require('./reporter'),
    configure = require('./Jody').configure,
    specs = require('./Jody.js').specs;

var Runner = exports.Runner = function () {
  events.EventEmitter.call(this);

  var self = this;
  self.active_specs = 0;

  self.run = function (specs) {
    self.active_specs = specs.length;
    self.run_specs(specs);
  };

  self.run_specs = function (specs) {

    specs.forEach(function (spec) {
      spec.on('done', function () {
        self.active_specs -= 1;
        if (self.active_specs > 0) { return;}
        
        self.on('afterAllDone', function () {
          self.emit('done');
        });
        
        self.afterAllSpecs();
        
      });

      self.runSpecCase(spec);

    });

  };

  self.runSpecCase = function (specCase) {
    var beforeAllDone = false;

    setTimeout(function () {
      if (!beforeAllDone) {
        self.runEachSpec(specCase); 
      };
    }, 1000);

    specCase.beforeAllMethodBody(function () {
      beforeAllDone = true;
      self.runEachSpec(specCase); 
    });

  };

  self.runEachSpec = function (specCase) { 
    specCase.specs.forEach( function (spec) {
      try {
        specCase.beforeEachMethodBody();

        spec.methodBody(function (fn) {
          spec.active_asyncs += 1;

          if(typeof(fn) === 'string') {
            spec.passed = false;
            spec.error.message = "Callback was not called!"
          return function () {
            spec.passed = true;
            spec.error.message = ""
          spec.async_complete();
          };
          }
          return function() {
            try {
              fn(arguments[0],arguments[1],arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]); // super hacky need a fix for this, but only way to pass through multiple arguments with else passing through an array
            } catch(e) {
              spec.passed = false;
              spec.error = e;
            }

            if (spec.passed == "unset") {
              spec.passed = true;
            }
            spec.async_complete();            
          };
        });

        if(spec.error.message === "" || !spec.error.message) {
          spec.passed = true;
        }

      } catch (e)  {
        spec.passed = false;
        spec.error = e;
      }

      spec.check_if_done();
    });
  };


   self.beforeAllSpecs = function (methodBody) {
   
    configure.beforeAllSpecsMethodBody(function () {
      self.emit('beforeAllDone');
    });
  };

  self.afterAllSpecs = function (cb) {
    configure.afterAllSpecsMethodBody(function () {
      self.emit('afterAllDone');
    });
  };
};

require('sys').inherits(Runner, events.EventEmitter);




