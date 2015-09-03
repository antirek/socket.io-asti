
var socket_io = require('socket.io');
var http = require('http');
var fs = require('fs');

var config = require('./config');
var Client = require('./lib/client');
var Pool = require('./lib/pool');

var pool = new Pool();

var asterisk = new require('./lib/asterisk')(pool, config.ami);


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var app = http.createServer(handler);
var io = socket_io(app);
app.listen(3111);

io.on('connection', function (socket) {
  var client = new Client({socket: socket});
        
  client.on('subscribe', function (data) {
    pool.addClient(data.interface, client);
  });

  client.on('unsubscribe', function (data) {
    pool.removeClient(client);
  });
});