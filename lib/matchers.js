var assert = require('assert'),
    url = require('url');


var matcher = function (actual) {
  var actual = actual, self = actual;


    this.beEqual = function (expected){
      assert.equal(actual, expected);
    };

    this.notBeEqual= function (expected) {
      assert.notDeepEqual(actual, expected);
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

  // web matchers
  this.redirect_to = function (redirect_url) {
    
    if (self.statusCode < 300 || self.statusCode > 310) {
      throw {
        message: "Status Code not set to a redirect"
      }
    }

    urlObj = url.parse(self.headers.location);
    assert.equal(urlObj.pathname, redirect_url);

  };
  
  return this;
};

Object.defineProperty(Object.prototype, 'should', { value: function () {
                                                                return matcher(this);
                                                            },
                                                   });

