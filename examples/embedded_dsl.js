var describe = require('Jody').describe;


describe("Embedded API", function (spec) {

  spec.it("Should work like this", function () {
    var i = 0;

    i.should().beEqual(0);

  });

  spec.it("Should notice a failure", function () {
    var i = -1;

    i.should().beEqual(0);

  });

  spec.it("Should support async operations", function (async) {
    var i = 0;

    setTimeout(async(function () {
      i++;
      i.should().beEqual(2);
    }),200);

    i++;

  });

});





