var playerManager = require('./PlayerManager'),
    Player = require('./Player'),
    HighScores = require('./HighScores');

var GameServer = function GameServer () {

    this.socketManager;

    var eggHealth = 0;

    var tick = function() {
        if (process.env.DEBUG) {console.log("GameServer.tick"); }
        var isWin = this.checkCollide();
        var playerSnapshot = currentPlayerSnapshot();
        for (var key in playerManager.players) {
            playerManager.players[key].socket.emit('poll', {playerSnapshot:playerSnapshot});
        }

        this.socketManager.emit('poll', {playerSnapshot:currentPlayerSnapshot()});
    }.bind(this);

    this.run = function(clockSpeed) {
        this.reset();
        if (process.env.DEBUG) {console.log("GameServer.run"); }
        setInterval(tick, clockSpeed);
    }

    this.reset = function() {
        if (process.env.DEBUG) {console.log("GameServer.reset"); }
        eggHealth = 10 * Object.keys(playerManager.players).length;
        
        this.socketManager.emit("reset");
    }

    var gameWin = function (player) {


        setTimeout(function () {
            this.reset();
        }.bind(this), 5000);

    }

    this.checkCollide = function() {
      if (playerManager.egg == null) return false;
      for (var key in playerManager.players) {
        var player = playerManager.players[key];
        if (player.gameteType != "egg"){
          var dx = Math.pow(playerManager.egg.position.x - player.position.x, 2);
          var dy = Math.pow(playerManager.egg.position.y - player.position.y, 2);
          if (Math.sqrt(dx + dy) < 100) {
              egghealth--;
              if (eggHealth > 0) {
                player.socket.emit('score', {score: ++player.score});      
              } else {
                  gameWin(player);
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
