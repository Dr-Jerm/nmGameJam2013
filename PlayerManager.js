
var PlayerManager = function PlayerManager () {

    var self = this;

    self.players = {};

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

}


module.exports = new PlayerManager(); // singleton player manager
