var describe = require('jody').describe;


describe("Async method call").
  it("Should notify when event fired", function (async) {
    var testAsync = function (cb) {
      setTimeout(function () {
        cb();
      },20);
    };


    testAsync(async("fire"));

  });
