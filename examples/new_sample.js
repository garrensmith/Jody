var describe = require('Jody').describe;

var value = "";

require.('Jody').configure.beforeAll(function () {
      value = "set in beforeAll"
   
});

describe('New Api').
    it("Should have a global before all", function () {
       value.should().beEqual("npmset in beforeAll");
    }).
    it("Should make async easy", function () {
        var counter = 0;
        
        setTimeout(function () {
            counter++;
            
            counter.should().beEqual(1);
            async_complete();
        }, 10);
        
        async_wait();        
    }).
    it("Should support multiple callbacks", function () {
         var counter = 0;
        
        setTimeout(function () {
            counter++;
            
            counter.should().beEqual(1);
            async_complete();
        },10);
        
        setTimeout(function () {
            counter++;
            
            counter.should().beEqual(2);
            async_complete();
        },20);
        
        async_wait(2);
    });
    

