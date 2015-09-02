
var asterisk = function (pool)  {
	var ami = new require('asterisk-manager')('5038','localhost','admin','superpassword', true); 
	console.log('inited') 
	// In case of any connectiviy problems we got you coverd. 
	ami.keepConnected();
	 
	// Listen for any/all AMI events. 
	ami.on('agentcalled', function (evt) {
		console.log(evt);
		var client = pool.getClient(evt.interface);
			client.emitToSocket('agentcalled', evt);
	});
};

module.exports = asterisk;