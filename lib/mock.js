
var Mock = function () {};


var mock = function (libRelativePath) {
  var moduleMock = new Mock(),
  libAbsolutePath = require.resolve(libRelativePath); 
  
  require.cache[libAbsolutePath] = {exports : moduleMock }

  return moduleMock;

};


module.exports = mock;
