var util = require('util');

exports.disconnect = function (data) {
	console.log("Player has disconnected: " + this.id);
}

exports.playerUpdate = function (data) {
	console.log("playerUpdate");
}