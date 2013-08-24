
// var network = require('networking');

module.exports = function Player (name, socket, startingAttrs) {
	this.name = name;
	this.id = socket.id;
	this.socket = socket;

	if (startingAttrs) {
		;
	}

}