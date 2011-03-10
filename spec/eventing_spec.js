var describe = require('Jody').describe,
    Spec = require('../lib/Jody').Spec,
    SpecCase = require('../lib/Jody').SpecCase,
    runner = require('../lib/runner').runSpecCase;

  describe("Spec Done Event").
  it("Should fire when done", function (async) {
    var spec = new Spec("test spec"),
    fired = false;

    spec.on('done', async(function () {
      fired = false;
      fired.should().beTrue();
    }));

    spec.check_if_done();

  });

describe("SpecCase Done Event").
  it("Should fire on spec complete", function (async) {

    var fired = false;

    var specCase = new SpecCase("testing");

    specCase.it("spec1", function () {});

    specCase.on('done', async(function() {
      fired = false;
      fired.should().beTrue();
    }));

    runner(specCase);

  }).
  it("Should fire on all specs complete", function (async) {

    var fired = false;

    var specCase = new SpecCase("testing");

    specCase.it("spec1", function () {});
    specCase.it("spec2", function () {});
    specCase.it("spec3", function () {});


    specCase.on('done', async(function() {
      fired = false;
      fired.should().beTrue();
    }));

    runner(specCase);

  });


