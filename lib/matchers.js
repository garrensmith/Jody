var assert = require('assert');


var matcher = function (actual) {
  var actual = actual;
    this.beEqual = function (expected){
      assert.equal(actual, expected);
    };

  this.throwError = function () {
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

  this.beTrue = function () {
    assert.equal(actual, true);  
  };

  this.beFalse = function () {
    assert.equal(actual, false);
  };

  this.contain = function (item) {
    var result = actual.lastIndexOf(item);

    if (result < 0) {
      throw {
        message : "Array does not contain item " + item
      }
    }


  };
  
  return this;
};


Object.prototype.should = function () {
  return matcher(this);
};

