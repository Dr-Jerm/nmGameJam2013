var playerManager = require('./PlayerManager'),
    Player = require('./Player'),
    HighScores = require('./HighScores');

var GameServer = function GameServer () {

    this.socketManager;

    var tick = function() {
        if (process.env.DEBUG) {console.log("GameServer.tick"); }
        var isWin = playerManager.checkWin();
        this.socketManager.emit('poll', {playerSnapshot:currentPlayerSnapshot()});
    }.bind(this);

    this.run = function(clockSpeed) {
        if (process.env.DEBUG) {console.log("GameServer.run"); }
        setInterval(tick, clockSpeed);
    }

    this.reset = function() {
        if (process.env.DEBUG) {console.log("GameServer.reset"); }
        this.socketManager.emit("reset");
    }

    this.spawnPlayer = function(playerID, initialParams) {
    }

    var currentPlayerSnapshot = function() {
        var snapshot = []
        for (var key in playerManager.players) {
            var cleanPlayer = playerManager.players[key].clientPlayer();
            snapshot.push(cleanPlayer);
        }
        return snapshot;
    }


    this.setSocketManager = function(socketManager) {
        this.socketManager = socketManager;
        socketManager.on('connection', function (socket) {

            socket.on("newUser", function(data) {
                if (process.env.DEBUG) {console.log("Networking.newUser:"+this.id)}
                console.log("Player name registered: " + data.user);
                var newPlayer = playerManager.generatePlayer(data.user, this, {});
                playerManager.addPlayer(newPlayer);

                this.emit('acceptedUser', 
                  {id: newPlayer.id, gameteType: newPlayer.gameteType});
            });

            socket.on("disconnect", function() {
                if (process.env.DEBUG) {console.log("Networking.disconnect:"+this.id)}
                playerManager.removePlayer(this.id);
                socketManager.emit("playerDisconnect", {playerId: this.id});
            });
        });
    }

}

module.exports = new GameServer(); // singleton game server
