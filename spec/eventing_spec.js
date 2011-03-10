var describe = require('Jody').describe,
    Spec = require('../lib/Jody').Spec,
    SpecCase = require('../lib/Jody').SpecCase,
    SpecRunner = require('../lib/runner').Runner,
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

describe('Runner').
  it('Should fire on specCase complete', function (async) {
    var fired = false;

    var specCase = new SpecCase("testing");

    specCase.it("spec1", function () {});
    specCase.it("spec2", function () {});
    specCase.it("spec3", function () {});

    var runner = new SpecRunner();

    runner.on('done', async(function() {
      console.log("boom");
      fired = false;
      fired.should().beTrue();
    }));

    specs = [];
    specs.push(specCase);
    runner.run(specs);
  }).
  it('Should fire on all specCases complete', function (async) {
    var fired = false;

    var specCase1 = new SpecCase("testing1");

    specCase1.it("spec1", function () {});
    specCase1.it("spec2", function () {});
    specCase1.it("spec3", function () {});

    var specCase2 = new SpecCase("testing2");

    specCase2.it("spec1", function () {});
    specCase2.it("spec2", function () {});
    specCase2.it("spec3", function () {});


    var specCase3 = new SpecCase("testing3");

    specCase3.it("spec1", function () {});
    specCase3.it("spec2", function () {});
    specCase3.it("spec3", function () {});


    var runner = new SpecRunner();

    runner.on('done', async(function() {
      console.log("boom");
      fired = false;
      fired.should().beTrue();
    }));

    specs = [];
    specs.push(specCase1);
    specs.push(specCase2);
    specs.push(specCase3);

    runner.run(specs);
  });


