var describe = require('Jody').describe
, http = require('http')
, express = require('express');

var testServer = http.createServer(function (req, res) {

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




var Server_test_utils = function (server) {
  var self = this;

  var test_server = server;

  self.get = function (options, cb) {
    var body = "";


    test_server.listen(8123, '127.0.0.1');

    var options = {
      host: '127.0.0.1',
      port: 8123,
      path: '/',
      method: 'GET'
    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        body += chunk;
      });

      res.on('end', function () {
        test_server.close();
        cb(body);
      });
    });

    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();

  };

  self.post = function (url, request_options, cb) {
     var body = "";
     test_server.listen(8123, '127.0.0.1');

    var options = {
      host: '127.0.0.1',
      port: 8123,
      path: '/',
      method: 'POST',
      body:  request_options.body || ''

    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        body += chunk;
      });

      res.on('end', function () {
        test_server.close();
        cb(body);
      });
    });

    // write data to request body
    if (options.body) {
      req.write(options.body);
    }
    req.end();

  };

  return self;

};

/* Return header and body
 * refactor post and get
 */

describe('Http Server').
it("should Get with basic http server", function () {
  /* var server = new Server_test_utils(testServer);

     server.get({}, function (response) {

     console.log("RESPONSE " + response);
     response.should().contain('Hello World');
     });*/

}).
it("Should Post data to server", function () {
  var server = new Server_test_utils(testServer);

  server.post('/', {body: "info"}, function (response) {

    response.should().contain('info received');
  });

}).
it('should Get with basic express server', function () {
  /*var server = new Server_test_utils(app);

    server.get({}, function (response) {

    console.log("RESPONSE " + response);
    response.should().contain('Hello From Express');
    });*/

});
