
var Mock = function () {};


var mock = function (libName) {
  var moduleMock = new Mock();  

require.cache[libName] = {exports : moduleMock }

  return moduleMock;
      

};


module.exports = mock;
