var describe = require('jody').describe;
    , describe_under_test = require('../lib/Jody').describe
    , http = require('http');

var httpServer = http.createServer( function () {


}).listen(8080,"127.0.0.1");



describe("Http testing").
  it("Should collect app server", function () {
    describe_under_test

  });
