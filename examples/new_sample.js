var describe = require('Jody').describe;

var beforeAllValue = beforeEachValue = "";

require('Jody').configure.beforeAll(function (done) {
      beforeAllValue = "set in beforeAll";
      done();   
});

describe('New Api').
    beforeEach(function (done) {
        beforeEachValue = "beforeEachValue"
        done();
    }).
    it("Should have a global before all", function () {
        beforeAllValue.should().beEqual("set in beforeAll");       
    }).
    it("Should have a before Each", function () {
      beforeEachValue.should().beEqual("beforeEachValue");
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
            console.log("timer " +  counter);            
            counter.should().beEqual(1);
            console.log("timer " +  counter);
        }),10);
        
        setTimeout(async(function () {
            counter++;
            counter.should().beEqual(3);            
        }),350);        
        
    });
    

