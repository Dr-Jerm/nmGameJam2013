var playerManager = require('./PlayerManager');

var GameServer = function GameServer () {


	var tick = function () {
		if (process.env.DEBUG) {console.log("GameServer.tick"); }
		playerManager.poll();
	}.bind(this);

	this.run = function (clockSpeed) {
		if (process.env.DEBUG) {console.log("GameServer.run"); }
    	setInterval(tick, clockSpeed);
	}
	

}


module.exports = new GameServer();