var Player = require('./Player');

var util = require('util');

var PlayerManager = function PlayerManager () {

    var self = this;

    self.players = {};
    self.egg = null;

    this.generatePlayer = function(user, manager, attrs) {
        var player = null;
        if (self.egg == null) {
          attrs.gameteType = "egg";
          player = new Player(user, manager, attrs);
          self.egg = player;
        } else {
          player = new Player(user, manager, attrs);
        }
        return player;
    }

    this.addPlayer = function (player) {
        if (process.env.DEBUG) {console.log("PlayerManager.addPlayer"); }
        if (!(player.id in self.players)) {
            self.players[player.id] = player;
        }
    }

    this.removePlayer = function (playerID) {
        if (process.env.DEBUG) {console.log("PlayerManager.removePlayer"); }
        if (playerID in self.players) {
            delete self.players[playerID];
        }    
    } 

    this.pointInCircle = function() {

    }

}


module.exports = new PlayerManager(); // singleton player manager
