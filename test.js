
var Client = require('./lib/client');
var Pool = require('./lib/pool');
var EventEmitter = require('events').EventEmitter;

var pool = new Pool();

var obj = {socket: new EventEmitter()};

var client = new Client(obj, pool);
client.on('subscribe', function (data) {
	pool.addClient(data.agent, client);
});

obj.socket.emit('subscribe', {lol:1234, agent: 'SIP/1234'})

console.log(pool.getPool());

var pool = pool.getPool();

var cll = pool.get('SIP/1234');

console.log(cll.getId());