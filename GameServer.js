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
        eggHealth = Math.max(2 * Object.keys(playerManager.players).length, 10);

        this.socketManager.emit("reset", {playerSnapshot:currentPlayerSnapshot()});
        resetPending = false;
    }

    var shuffleEgg = function (winningPlayer) {
        if (!winningPlayer) {
            winningPlayer = pickRandomPlayer();
        } 

        if (playerManager.egg) {
            playerManager.egg.gameteType = "sperm";
            playerManager.egg = winningPlayer;    
        }
        
        if (winningPlayer) {
            winningPlayer.gameteType = "egg";    
        }
    }

    var gameWin = function (player) {
        console.log("GameServer.gameWin."+player.id);
        self.socketManager.emit("gameWin", {playerId: player.id});
        HighScores.insertScores(currentPlayerSnapshot());

        resetPending = true;

        setTimeout(function () {
            shuffleEgg(player);

            self.reset();
        }, 5000);

    }

    var collisionBuffer = false;

    this.checkCollide = function() {
      if (playerManager.egg == null || collisionBuffer || resetPending) return false;
      for (var key in playerManager.players) {
        var player = playerManager.players[key];
        if (player.gameteType != "egg"){
          var dx = playerManager.egg.position.x - player.position.x;
          var dy = playerManager.egg.position.y - player.position.y;
          
          if (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)) < 100) {
              eggHealth--;
              var angle = Math.atan2(dx, dy); 
              if (eggHealth > 0) {
                self.socketManager.emit('score', {score: ++player.score, id:player.id , angle: angle});
                console.log(eggHealth);
                collisionBuffer = true
                setTimeout(function () {
                    collisionBuffer = false;
                }, 500);
              } else {
                    self.socketManager.emit('score', {score: ++player.score, id:player.id , angle: angle});
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
                  {id: newPlayer.id, 
                   name: newPlayer.name, 
                   gameteType: newPlayer.gameteType});
            });

            socket.on("disconnect", function() {
                if (process.env.DEBUG) {console.log("Networking.disconnect:"+this.id)}
                playerManager.removePlayer(this.id);
                socketManager.emit("playerDisconnect", {playerId: this.id});

                if (playerManager.egg && this.id == playerManager.egg.id) {
                    shuffleEgg()
                    self.reset();
                }
            });
        });
    }

    var pickRandomPlayer = function (players) {
        var player;

        var randIndex = Math.floor(Math.random()*Object.keys(playerManager.players).length);
        var count = 0;

        for (var key in playerManager.players) {
            if (count == randIndex) {
                return playerManager.players[key];
            }
        }

    }

}

module.exports = new GameServer(); // singleton game server

 