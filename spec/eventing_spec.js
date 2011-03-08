var describe = require('Jody').describe,
    Spec = require('../lib/Jody').Spec;

describe("Spec Done Event").
  it("Should fire when done", function (async) {
    var spec = new Spec("test spec"),
    fired = true;

    spec.on('done', async(function () {
      fired.should().beTrue();
    }));

    spec.check_if_done();

  });
