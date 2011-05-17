var events = require('events'),
    reporter = require('./reporter'),
    configure = require('./Jody').configure,
    specification_groups = require('./Jody').specification_groups;
    
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
    var Async_Handler = function (specification) {
            var self = this;
            
            self.specification = specification;
            self.active_cbs = 0;        
                        
            self.wait = function () {
                self.active_cbs += 1;
                
            };
            
            self.done = function () {
                self.active_cbs = self.active_cbs - 1;
            };
            
            self.async_wrapper = function(fn) {
              self.wait();  
              try_wrapper(self.specification, function () {
                self.done();   
                fn();                  
              });
            };
        };
    
    function check_callbacks_fired(async_handler) {
        setTimeout(function () {
            if ( async_handler.active_cbs > 0) {
                throw {
                    msg: "Not all callbacks were called"  
                };
            }
        },300);    
    }
    
    function try_wrapper(spec,fn) {
        try {
            fn();            
        }catch (ex) {
            spec.error = ex;
            spec.passed = false;
        }    
    }
    
    spec_group.specs.forEach( function (spec) {
        var async_handler = new Async_Handler(spec);
        
        try_wrapper(spec, function () {
            
            spec.fn(async_handler.async_wrapper);
            
            if (async_handler.active_cbs === 0) {
                spec.passed = true;                
            } else {
                check_callbacks_fired(async_handler);      
            } 
        });
        
    });
  };


   /*self.beforeAllSpecs = function (methodBody) {
   
    configure.beforeAllSpecsMethodBody(function () {
      self.emit('beforeAllDone');
    });
  };

  self.afterAllSpecs = function (cb) {
    configure.afterAllSpecsMethodBody(function () {
      self.emit('afterAllDone');
    });
  };*/
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
        spec.error = e;
      }

      spec.check_if_done();
*/




