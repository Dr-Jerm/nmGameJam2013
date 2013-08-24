var util = require('util');

var playerManager = require('./PlayerManager');
var Player = require('./Player');

exports.newUser = function (data) {
    if (process.env.DEBUG) {console.log("Networking.newUser:"+this.id)}
    console.log("Player name registered: " + data.user);
    var newPlayer = new Player(data.user, this);
    playerManager.addPlayer(newPlayer);

    this.emit('acceptedUser', {id: newPlayer.id});
}

exports.disconnect = function (data) {
    if (process.env.DEBUG) {console.log("Networking.disconnect:"+this.id)}
    playerManager.removePlayer(this.id);
}