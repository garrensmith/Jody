var events = require('events'),
    async = require('async'),
    reporter = require('./reporter'),
    configure = require('./Jody').configure,
    specification_groups = require('./Jody').specification_groups;
    
 function try_wrapper(spec,fn) {
        try {
            fn();            
        }catch (ex) {
            spec.error = ex;
            spec.passed = false;
        }    
    }

var Async_Handler = function (specification, done_cb) {
            var self = this;
            
            self.done_cb = done_cb;
            self.specification = specification;
            self.active_cbs = 0;        
                        
            self.wait = function () {
                self.active_cbs = self.active_cbs + 1;                
            };
            
            self.done = function () {
                self.active_cbs = self.active_cbs - 1;
                
                if (self.active_cbs === 0) {                    
                    self.done_cb();
                }
            };            
            
            self.async_wrapper = function(fn) {              
              self.wait();  
              //try_wrapper(self.specification, function (args) {
              return function () {
                try {
                fn.apply(this,arguments);     
                self.specification.passed = true;
                } catch (ex) {
                    self.specification.error = ex;
                    self.specification.passed = false;
                }

                self.done();

              };
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

var SpecRunner =  function () {
    var self = this;
    
    self.run = function (spec, spec_group) {
        self.spec = spec;
        self.spec_group = spec_group;
                
        async.series([
          self.beforeEachSpec
        , self.run_spec
        , self.afterEachSpec
        ]);
        
    };
    
    self.beforeEachSpec = function (done) {
      self.spec_group.beforeEachFn(done);      
    };     
       
    
    self.run_spec = function (done) {      
         var async_handler = new Async_Handler(self.spec, done);
        
        try{        
            self.spec.fn(async_handler.async_wrapper);
            
            /* change this to a boolean check */
            if (async_handler.active_cbs === 0) { 
                self.spec.passed = true;
                done();
            } else {
                //check_callbacks_fired(async_handler);      
            } 
        } catch (ex) {
            self.spec.error = ex;
            self.spec.passed = false;            
        }
        
    };
    
    self.afterEachSpec = function (done) {
        self.spec_group.afterEachFn(done);
    }; 
};


var SpecGroupRunner =  function () {
    var self = this;
    
    self.run = function (spec_group, done) {
        self.spec_group = spec_group;
                
        async.series([
          self.beforeAllSpecs
        , self.run_specs
        , self.afterAllSpecs
        ], function (err) {
          if (err) {
            console.log("oh no error");
            console.dir(err);
          }
        //  console.log("complete " + self.spec_group.desc);
          done();
        });
        
    };
    
    self.beforeAllSpecs = function (done) {
      self.done = done;
      var new_done = function () {
       // console.log("done called spec group: " + self.spec_group.desc);
        try {
        self.done();
        } catch(e) {
          console.dir(e)
        }
      };

      self.spec_group.beforeAllFn(new_done);
      //console.log("spec group: " + self.spec_group.desc);
    };
    
    self.run_specs = function (done) {
        var specRunner = new SpecRunner();
        
        self.spec_group.specs.forEach(function (spec) {            
           specRunner.run(spec,self.spec_group);
        });
        //console.log("spec complete for " + self.spec_group.desc);
        done();
        
    };
    
    self.afterAllSpecs = function (done) {
     //   console.log("after all");
        self.spec_group.afterAllFn(done);
    }; 
}


var Runner = exports.Runner = function () {
  events.EventEmitter.call(this);

  var self = this;
  self.incomplete_specs = 0;

  self.run = function (specification_groups, done) {
    self.incomplete_specs = specification_groups.length;
    self.specification_groups = specification_groups;    
    self.done = done;
    
    async.series([
              self.runBeforeAll
            , self.run_specs            
            , self.runAfterAll
        ], function () {
          self.done();
        });
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
      
      var specGroupRunner = new SpecGroupRunner();

      var runner = function (spec_group, done) {
        specGroupRunner.run(spec_group,done);           
      };

      var end = function (err) {
        if (err) {
          console.log("error");
          console.dir(err);
        }
      };


     async.forEachSeries(specification_groups, runner, end); 
  };  
};

require('util').inherits(Runner, events.EventEmitter);






