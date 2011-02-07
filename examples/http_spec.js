var describe = require('Jody').describe
, http = require('http')
, express = require('express');

var testServer = http.createServer(function (req, res) {
  console.log("URL: " + req.url);


  if (req.method === "POST") {
    //console.dir(req);
    res.writeHead(200, {'Content-Type': 'text/plain'});

      var body = ""

    req.on('data', function (chunked) {
      console.log("SERVER data: " + chunked);
      body += chunked;
    });

    req.on('end', function () {
      res.end(body + ' received\n');
    });

  } else if (req.url === '/foo' ){
     res.writeHead(200, {'Content-Type': 'text/plain'});
    req.on('end', function () {
      res.end('bar');
    });

  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }
});

/*var app = module.exports = express.createServer();
// Configuration

app.configure(function(){
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyDecoder());
//app.use(express.cookieDecoder());
// app.use(express.session({secret:'017eadcfc3a5db0f285d63e1a1002d04' }))
app.use(express.methodOverride());
app.use(app.router);
app.use(express.staticProvider(__dirname + '/public'));
});

app.get('/', function(req, res){
res.send('Hello From Express');
});*/


var Server_test_utils = function (server, port) {
  var self = this;

  test_server = server;
  test_server.connections = 0;

  self.request = function (request_options, cb) {
    var options = {
        host: '127.0.0.1',
        port: port || 8123,
        path: request_options.url ||  '/',
        method: request_options.method || 'GET',
        body:  request_options.body || ''
    };

    console.log("Connections: " + test_server.connections);
    if (test_server.connections === 0) {
      test_server.listen(8123, '127.0.0.1');
    }

    test_server.connections += 1;


     var req = http.request(options, function(res) {
      res.body = "";

      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));

      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        res.body += chunk;
      });

      res.on('end', function () {
        test_server.connections += -1;

        console.log("End connections: " + test_server.connections);
        if (test_server.connections === 0) {
          console.log("Closing server");
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
      self.request(request_options, cb);
  };

  self.post = function (url, request_options, cb) {
    request_options.method = 'POST';
    request_options.url = url;

    self.request(request_options, cb);
  };

  return self;

};

/* Return header and body
 * turn verbose on and off
 */

var server = new Server_test_utils(testServer);

describe('Http Server').
it("should Get with basic http server", function () {
     var server = new Server_test_utils(testServer);

     server.get('/', {}, function (response) {

     console.log("RESPONSE " + response);
     response.body.should().contain('Hello World');
     });

}).
it("Should Post data to server", function () {
  server.post('/', {body: "info"}, function (response) {
    response.headers["content-type"].should().beEqual("text/plain");
    response.body.should().contain('info received');
  });
}).
it("should get with specific url", function () {

   server.get('/foo',{}, function (response) {
     console.log("bar:" + response);
    response.body.should().contain('bar');
   });

}).
it('should Get with basic express server', function () {
  /*var server = new Server_test_utils(app);

    server.get({}, function (response) {

    console.log("RESPONSE " + response);
    response.should().contain('Hello From Express');
    });*/

});
