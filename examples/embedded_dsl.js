var describe = require('Jody').describe;


describe("Embedded API", function () {

  it("Should work like this", function () {
    var i = 0;

    i.should().beEqual(0);

  });

  it("Should notice a failure", function () {
    var i = -1;

    i.should().beEqual(0);

  });

  it("Should support async operations", function (async) {
    var i = 0;

    setTimeout(async(function () {
      i.should().beEqual(2);
    }),200);

    i++;

  });

});


var Weird = function () {

  hello = function () {
    console.log("Hello");
    console.log(this);
  };

  console.dir(this);
  
  hello();

};

//new Weird();

console.dir(it);



