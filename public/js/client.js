function Client(server) {
  this.server = server;
  this.socket = 0;

  this.start = function() {
    this.socket = io.connect(server);
  }

  this.playerlogin = function(player) {
    this.socket.emit("login", {username: player.username});
  }

  this.emit = function(key, vals) {
    this.socket.emit(key, vals);
  }
}
