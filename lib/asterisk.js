'use strict';
var AsteriskManager = require('asterisk-manager');

var asterisk = function (pool, config)  {
    var amiConnection = new AsteriskManager(config.port, config.host, config.username, config.password, true); 
    amiConnection.keepConnected();
     
    var handler = function (evt) {
        console.log(evt);
        
        var clients = pool.getClients(evt.interface);
        
        if (clients) {
            clients.forEach(function (client, key){
                client.emitToSocket(evt.event.toLowerCase(), evt);
            })
        };      
    };

    amiConnection.on('agentcalled', handler);
    amiConnection.on('agentcomplete', handler);
    amiConnection.on('agentconnect', handler);
    amiConnection.on('queuecallerabandon', handler);
};

module.exports = asterisk;