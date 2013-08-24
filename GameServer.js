var playerManager = require('./PlayerManager'),
    network = require('./networking');

var GameServer = function GameServer () {

    this.socketManager;


    var tick = function () {
        if (process.env.DEBUG) {console.log("GameServer.tick"); }
        playerManager.poll();
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


    this.setSocketManager = function (socketManager) {
        socketManager.on('connection', function (socket) {
          this.socketManager = socketManager;

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