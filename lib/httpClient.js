var http = require('http');


var HttpClient = module.exports = function (server, debug ) {
  var self = this;
  //if (debug) {
    self.debug = function (msg) {
      console.log(msg);
    }
  /*} else {
    self.debug = function () {};
  }*/
  
 
  var test_server = server;
  test_server.connections = 0;

  self.request = function (request_options, cb) {
    var options = {
        host: '127.0.0.1',
        port:  8123,
        path: request_options.url ||  '/',
        method: request_options.method || 'GET',
        body:  request_options.body || ''
    };
  
    self.debug("Connections: " + test_server.connections);
    if (test_server.connections === 0) {
      self.debug("starting server");
      test_server.listen(8123, '127.0.0.1');
    }

    test_server.connections += 1;


     var req = http.request(options, function(res) {
      res.body = "";

      self.debug('STATUS: ' + res.statusCode);
      self.debug('HEADERS: ' + JSON.stringify(res.headers));

      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        self.debug('BODY: ' + chunk);
        res.body += chunk;
      });

      res.on('end', function () {
        test_server.connections += -1
        self.debug("End connections: " + test_server.connections);
        if (test_server.connections === 0) {
          self.debug("Closing server");
          test_server.close();
        }

        cb(res);
      });
    });

    // write data to request body
    if (options.body) {
      req.write(options.body);
    }
    req.end();

  };

  self.get = function (url, request_options, cb) {
      request_options.method = 'GET';
      request_options.url = url;
      self.debug("GET : url: " + url); 
      self.request(request_options, cb);
  };

  self.post = function (url, request_options, cb) {
    request_options.method = 'POST';
    request_options.url = url;

    self.request(request_options, cb);
  };

  return self;

};


