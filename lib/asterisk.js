'use strict';
var AsteriskManager = require('asterisk-manager');

var asterisk = function (pool, config)  {
    var ami = new AsteriskManager(config.port, config.host, config.username, config.password, true); 
    ami.keepConnected();
     
    var handler = function (evt) {
        console.log(evt);
        
        var clients = pool.getClients(evt.interface);
        
        if (clients) {
            clients.forEach(function (client, key){
                client.emitToSocket(evt.event.toLowerCase(), evt);
            })
        };      
    };

    ami.on('agentcalled', handler);
    ami.on('agentcomplete', handler);
    ami.on('agentconnect', handler);
    ami.on('queuecallerabandon', handler);
};

module.exports = asterisk;