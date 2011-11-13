var describe = require('Jody').describe;

var async_obj = {

  run: function (cb) {
    setTimeout(function () {
      setTimeout(function () {
        cb();
      },30);
    },100)

  }

}



describe("Test with embedded done in beforeAll", function (spec) {

  spec.beforeAll(function (done) {
    async_obj.run(function () {
      done();
    });
  });


  spec.it("Should be called", function (async) {
    "hello".should().beEqual("boom");

  });

});
