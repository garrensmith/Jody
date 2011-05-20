var events = require('events'),
    async = require('async'),
    reporter = require('./reporter'),
    configure = require('./Jody').configure,
    specification_groups = require('./Jody').specification_groups;
    
var Runner = exports.Runner = function () {
  events.EventEmitter.call(this);

  var self = this;
  self.incomplete_specs = 0;

  self.run = function (specification_groups) {
    self.incomplete_specs = specification_groups.length;
    self.specification_groups = specification_groups;    
    
    async.series([
              self.runBeforeAll
            , self.run_specs            
            , self.runAfterAll
        ]);
  };
  
  self.runBeforeAll = function (done) {
    if (!configure.beforeAllFn) {
        return done();        
    } 
    
    configure.beforeAllFn(done);    
    
  };
  
  self.runAfterAll = function () {
      if (!configure.afterAllFn) {
        return done();        
    } 
    
    configure.afterAllFn(done);
  };

  self.run_specs = function (done) {

    specification_groups.forEach(function (spec_group) {
      spec_group.on('done', function () {
        self.active_specs -= 1;
        if (self.active_specs > 0) { return;}
        
        done();       
        
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
              try_wrapper(self.specification, function (args) {
                self.done();   
                fn.call(this,args);                  
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
  
};

require('sys').inherits(Runner, events.EventEmitter);






