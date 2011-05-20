var describe = require('Jody').describe;

var value = "";

require('Jody').configure.beforeAll(function (done) {
      value = "set in beforeAll";
      done();   
});

describe('New Api').   
    it("Should have a global before all", function () {
       value.should().beEqual("set in beforeAll");
    }).
    it("Should make async easy", function (async) {
        var counter = 0;
        
        setTimeout(async(function () {
            counter++;
            counter.should().beEqual(1);            
        }), 60);
        
        
    }).
    it("Should support multiple callbacks", function (async) {
         var counter = 0;
        
        setTimeout(async(function () {
            counter++;
            counter.should().beEqual(1);
            
        }),10);
        
        setTimeout(async(function () {
            counter++;
            counter.should().beEqual(2);            
        }),20);        
        
    });
    

