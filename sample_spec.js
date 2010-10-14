var spec = require('./spec_my_node.js')
var assert = require("assert");
var inspect = require('sys').inspect;

console.log(inspect(spec.describe));

spec.describe("Test").it("Should pass",function(){
  assert.equal(1,2);
});
