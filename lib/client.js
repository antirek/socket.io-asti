'use strict';

var EventEmitter = require('events').EventEmitter;

var Client = function (obj) {

	var socket = obj.socket;
	var emitter = new EventEmitter();

	var emitToSocket = function (evt, data) {
		socket.emit(evt, data);
	};

	var onSocketEvent = function (evt, callback) {
		socket.on(evt, callback);
	};

	var on = function (evt, callback) {
		emitter.on(evt, callback)
	};

	var emit = function (evt, data) {
		emitter.emit(evt, data);
	};

	var getId = function () {
		return "1";
	};

	var init = function () {
		socket.on('subscribe', function (data) {
			emit('subscribe', data);
		});
	}();

	return {
		emit: emit,
		on: on,
		getId: getId
	};
};

module.exports = Client;