var playerManager = require('./PlayerManager'),
    Player = require('./Player'),
    HighScores = require('./HighScores');

var GameServer = function GameServer () {
    var self = this;

    this.socketManager;

    var eggHealth = 0;
    var resetPending = false;

    var tick = function() {
        // if (process.env.DEBUG) {console.log("GameServer.tick"); }
        var isWin = this.checkCollide();
        var playerSnapshot = currentPlayerSnapshot();
        for (var key in playerManager.players) {
            playerManager.players[key].socket.emit('poll', {playerSnapshot:playerSnapshot});
        }

        // this.socketManager.emit('poll', {playerSnapshot:currentPlayerSnapshot()});
    }.bind(this);

    this.run = function(clockSpeed) {
        this.reset();
        if (process.env.DEBUG) {console.log("GameServer.run"); }
        setInterval(tick, clockSpeed);
    }

    this.reset = function() {
        if (process.env.DEBUG) {console.log("GameServer.reset"); }
        eggHealth = Math.max(10 * Object.keys(playerManager.players).length, 10);

        this.socketManager.emit("reset");
        resetPending = false;
    }

    this.gameWin = function (player) {
        console.log("GameServer.gameWin."+player.id);
        this.socketManager.emit("gameWin", {playerId: player.id});
        HighScores.insertScore(player);

        resetPending = true;

        setTimeout(function () {
            self.reset();
        }, 5000);

    }

    this.checkCollide = function() {
      if (playerManager.egg == null || resetPending) return false;
      for (var key in playerManager.players) {
        var player = playerManager.players[key];
        if (player.gameteType != "egg"){
          var dx = Math.pow(playerManager.egg.position.x - player.position.x, 2);
          var dy = Math.pow(playerManager.egg.position.y - player.position.y, 2);
          if (Math.sqrt(dx + dy) < 100) {
              eggHealth--;
              if (eggHealth > 0) {
                player.socket.emit('score', {score: ++player.score});
                console.log(eggHealth);
              } else {
                  this.gameWin(player);
              }

            
          }
        }
      }
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

                this.emit('acceptedUser', {id: newPlayer.id, gameteType: newPlayer.gameteType});
                self.reset();
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
