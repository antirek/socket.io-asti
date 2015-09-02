var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');


var Client = require('./lib/client');
var Pool = require('./lib/pool');

var pool = new Pool();


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


/*
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);

    var client = new Client({socket: socket});

  });
});

*/