
var hashmap = require('hashmap');

var Pool = function () {
	var pool = new hashmap();

	var addClient = function (key, client) {
		console.log('add client', key, client);
		pool.set(key, client);

		client.onSocketEvent('disconnect', function(){
        	removeClient(key);
    	});
	};

	var removeClient = function (key) {
		pool.remove(key);
	};

	var getPool = function () {
		return pool;
	};

	var getClient = function (key) {
		return pool.get(key);
	};

	return {
		addClient: addClient,
		getPool: getPool,
		getClient: getClient
	};
};

module.exports = Pool;