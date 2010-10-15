var result = "";
console.log = function (msg) {
  process.stdout.write(msg + 'stdout' + '\n');
};
var spec = require('../lib/spec_my_node.js');


spec.describe("Assert").
  it("Should pass true", function () {
    assert.equal(true,true);
    spec.print("hello");
  });
