var describe;
describe = require('Jody');
describe(function() {
  return it("Should look nice in coffee script", function() {
    var i;
    i = 0;
    return i.should().beEqual(0);
  });
});