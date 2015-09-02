
var HashMap = require('hashmap');

var Pool = function () {
	var pool = new HashMap();

	var addClient = function (key, client) {
		console.log('add client', key, client);
		pool.set(key, client);
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
	}
};

module.exports = Pool;