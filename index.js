var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');


var Client = require('./lib/client');
var Pool = require('./lib/pool');

var pool = new Pool();

var asterisk = new require('./lib/asterisk')(pool);

app.listen(3111);

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

io.on('connection', function (socket) {
  var client = new Client({socket: socket});
        
  client.on('subscribe', function (data) {
    pool.addClient(data.interface, client);
  });

  client.on('unsubscribe', function (data) {
    pool.removeClient(client);
  });
});