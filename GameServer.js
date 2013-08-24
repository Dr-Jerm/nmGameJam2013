var playerManager = require('./PlayerManager'),
	network = require('./networking');

var GameServer = function GameServer () {


	var tick = function () {
		if (process.env.DEBUG) {console.log("GameServer.tick"); }
		playerManager.poll();
	}.bind(this);

	this.run = function (clockSpeed) {
		if (process.env.DEBUG) {console.log("GameServer.run"); }
    	setInterval(tick, clockSpeed);
	}

	this.setSocketManager = function (socketManager) {
		socketManager.on('connection', function (socket) {
		  // socket.emit('hello', {welcome: "Hi, I'm text from a socket!"});

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