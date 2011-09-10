var http = require('http');


var HttpClient = module.exports = function (server, port,debug) {
  var self = this;
  if (arguments.length === 2 && debug) {
    self.debug = function (msg) {
      console.log(msg);
    };
  } else {
    self.debug = function () {};
  }

  self.port = port || 8123;
  var test_server = server;
  test_server.connections = 0;

  self.processBody = function (body) {
    if (!body) { return '';}

    if (typeof(body) === 'object') {
      self.debug("json object");
      return JSON.stringify(body);
    };

    return body;
  };

  self.request = function (request_options, cb) {
    var options = {
        host: '127.0.0.1',
        port:  self.port,
        path: request_options.url ||  '/',
        method: request_options.method || 'GET',
        body:  self.processBody(request_options.body),
        headers : {'Content-Type': 'application/json'}
    };
  
    self.debug("Connections: " + test_server.connections);
    if (test_server.connections === 0) {
      self.debug("starting server");
      test_server.listen(self.port , '127.0.0.1');
    }

    test_server.connections += 1;

      console.dir(options);
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
      var _cb, _request_options;
    
      if (arguments.length === 2) {
        _request_options = {};
        _cb = arguments[1];
      } else {
        _request_options = request_options;
        _cb = cb;
      }
    
      _request_options.method = 'GET';
      _request_options.url = url;
      self.debug("GET : url: " + url); 
      self.request(_request_options, _cb);
  };

  self.post = function (url, request_options, cb) {
    
    request_options.method = 'POST';
    request_options.url = url;
    
    self.debug("POST : url: " + url); 
    self.request(request_options, cb);
  };

  return self;

};


