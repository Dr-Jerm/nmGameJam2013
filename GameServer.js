var playerManager = require('./PlayerManager'),
    network = require('./networking');

var GameServer = function GameServer () {

    this.socketManager;


    var tick = function () {
        if (process.env.DEBUG) {console.log("GameServer.tick"); }
        this.socketManager.emit('poll', {playerSnapshot:currentPlayerSnapshot()});
    }.bind(this);

    this.run = function (clockSpeed) {
        if (process.env.DEBUG) {console.log("GameServer.run"); }
        setInterval(tick, clockSpeed);
    }

    this.reset = function () {
        if (process.env.DEBUG) {console.log("GameServer.reset"); }
        this.socketManager.emit("reset");
    }

    this.spawnPlayer = function (playerID, initialParams) {
        
    }

    var currentPlayerSnapshot = function () {
        var snapshot = []
        for (var key in playerManager.players) {
            var cleanPlayer = playerManager.players[key].clientPlayer();
            snapshot.push(cleanPlayer);
        }
        return snapshot;
    }


    this.setSocketManager = function (socketManager) {
        this.socketManager = socketManager;
        socketManager.on('connection', function (socket) {

            socket.on("newUser", network.newUser.bind(socket));
            socket.on("disconnect", network.disconnect.bind(socket));

          socket.on("up", function(data) {
            console.log("up: " + data);
          });
          socket.on("down", function(data) {
            console.log("down: " + data);
          });
          socket.on("left", function(data) {
            console.log("left: " + data);
          });
          socket.on("right", function(data) {
            console.log("right: " + data);
          });
        });
    }
    

}


module.exports = new GameServer();