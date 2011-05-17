var events = require('events'),
    reporter = require('./reporter'),
    configure = require('./Jody').configure,
    specification_groups = require('./Jody').specification_groups;
    
var async_controller = {
    waitForAsync: function(num) {
        
    },
    asyncComplete: function () {
        
    }    
};

var Runner = exports.Runner = function () {
  events.EventEmitter.call(this);

  var self = this;
  self.incomplete_specs = 0;

  self.run = function (specification_groups) {
    self.incomplete_specs = specification_groups.length;
    self.run_specs(specification_groups);
  };

  self.run_specs = function (specification_groups) {

    specification_groups.forEach(function (spec_group) {
      spec_group.on('done', function () {
        self.active_specs -= 1;
        if (self.active_specs > 0) { return;}
        
        self.on('afterAllDone', function () {
          self.emit('done');
        });
        
        self.afterAllSpecs();
        
      });

      self.runSpecGroup(spec_group);

    });

  };

  self.runSpecGroup = function (spec_group) {
    var beforeAllDone = false;

    setTimeout(function () {
      if (!beforeAllDone) {
        self.runEachSpec(spec_group); 
      }
    }, 300);

    spec_group.beforeAllFn(function () {
      beforeAllDone = true;
      self.runEachSpec(spec_group); 
    });

  };

  self.runEachSpec = function (spec_group) { 
    
    spec_group.specs.forEach( function (spec) {
    
    //    spec.
    
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


/* /old 
try {
        spec_group.beforeEachMethodBody();

        /*spec.methodBody(function (fn) {
          spec.active_asyncs += 1;

          if(typeof(fn) === 'string') {
            spec.passed = false;
            spec.error.message = "Callback was not called!";
          return function () {
            spec.passed = true;
            spec.error.message = "";
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
*/




