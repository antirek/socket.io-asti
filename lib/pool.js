
var HashMap = require('hashmap');

var Pool = function () {
	var pool = new HashMap();

	var addClient = function (key, client) {
		console.log('add client', key, client);
		pool.set(key, client);
	};

	var getPool = function () {
		return pool;
	}

	return {
		addClient: addClient,
		getPool: getPool
	}
};

module.exports = Pool;