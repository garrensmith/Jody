var describe = require('../lib/spec_my_node').describe;

describe("Async calls").
  it("Should process result", function () {
    setTimeout(function () {
      console.log("Run");
    }, 100);
  });
