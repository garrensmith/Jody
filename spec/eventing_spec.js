var describe = require('Jody').describe,
    Spec = require('../lib/Jody').Spec,
    SpecCase = require('../lib/Jody').SpecCase,
    runner = require('../lib/runner').runSpecCase;

describe("Spec Done Event").
  it("Should fire when done", function (async) {
    var spec = new Spec("test spec"),
    fired = false;

    spec.on('done', async(function () {
      fired = true;
      fired.should().beTrue();
    }));

    spec.check_if_done();

  });

describe("SpecCase Done Event").
  it("Should fire on all specs complete", function (async) {
    var spec1 = new Spec("spec1"),
        spec2 = new Spec("spec2");

    var fired = false;

    var specCase = new SpecCase("testing");

    specCase.specs.push(spec1);
    specCase.specs.push(spec2);

    specCase.on('done', async(function() {
      fired = false;
      fired.should().beTrue();
    }));

    runner(specCase);

  });


