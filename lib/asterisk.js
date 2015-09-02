
var asterisk = function (pool)  {
	var ami = new require('asterisk-manager')('5038','localhost','admin','superpassword', true); 
	ami.keepConnected();
	 
	var handler = function (evt) {
		console.log(evt);
		var client = pool.getClient(evt.interface);
		client.emitToSocket(evt.event.toLowerCase(), evt);
	};

	ami.on('agentcalled', handler);
	ami.on('agentcomplete', handler);
	ami.on('agentconnect', handler);
};

module.exports = asterisk;