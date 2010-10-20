var assert = require('assert');

var matcher = function (actual) {
  var actual = actual;
  this.be_equal = function (expected){
    assert.equal(actual, expected);
  };

  this.throw_error = function () {
    var didThrow = false;

    try {
      actual();
    }catch (e) {
      didThrow = true;
    }

    if (!didThrow) {
      throw {
        message : "Did not throw exception"
      }
    }
  };


  return this;
};


Object.prototype.should = function () {
  return matcher(this);
};

