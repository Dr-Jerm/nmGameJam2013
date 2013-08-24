
var PlayerManager = function PlayerManager () {

    var self = this;

    self.players = [];

    this.addPlayer = function (player) {
        if (process.env.DEBUG) {console.log("PlayerManager.addPlayer"); }
        if (self.players.indexOf() == -1) {
            self.players.push(player);
        }
    }

    this.poll = function () {
        if (process.env.DEBUG) {console.log("PlayerManager.poll"); }
        self.players.forEach(function (player) {
            player.socket.emit('poll', {fake:"data"});
            console.log("poking player: " + player.name);
        });
    }
}


module.exports = new PlayerManager();
