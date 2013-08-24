var util = require('util');

var playerManager = require('./PlayerManager');
var Player = require('./Player');

exports.newUser = function (data) {
    console.log("Player name registered: " + data.user);
    console.log(util.inspect(Player));
    var newPlayer = new Player(data.user, this);
    playerManager.addPlayer(newPlayer);

    this.emit('acceptedUser', {id: newPlayer.id});
}

exports.disconnect = function (data) {
    console.log("Player has disconnected: " + this.id);
    playerManager.removePlayer(this.id);
}

exports.playerUpdate = function (data) {
    console.log("playerUpdate");
}