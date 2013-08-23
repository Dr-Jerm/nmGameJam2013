function Client(server) {
  this.server = server;
  this.socket = 0;

  this.connect = function() {
    this.socket = io.connect(server);
  }
  
  this.emit = function(key, vals) {
    this.socket.emit(key, vals);
  }
  
}
