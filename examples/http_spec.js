var describe = require('Jody').describe
, http = require('http')
, HttpClient = require('Jody').HttpClient;

/*
var testServer = http.createServer(function (req, res) {
  console.log("server URL: " + req.url);


  if (req.method === "POST") {
    //console.dir(req);
    res.writeHead(200, {'Content-Type': 'text/plain'});

      var body = ""

    req.on('data', function (chunked) {
      //console.log("SERVER data: " + chunked);
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


var client = new HttpClient(testServer, false);

describe('Http Server').
it("should Get with basic http server", function (async) {

     client.get('/', {}, async(function (response) {

     //console.log("RESPONSE " + response);
     response.body.should().contain('Hello World');
     }));
}).
it("Should Post data to server", function (async) {
 client.post('/', {body: "info"},async(function (response) {
    response.headers["content-type"].should().beEqual("text/plain");
    response.body.should().contain('info received');
  }));
}).
it("should get with specific url", function (async) {

   client.get('/foo',{}, async(function (response) {
     //console.log("bar:" + response);
    response.body.should().contain('bar');
   }));

})
*/
