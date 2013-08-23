function Game() {
  this.viewport = new Viewport();
  this.client = new Client(config.host);
  this.input = new Input();
  this.controller = new Controller();
}

Game.prototype.start = function() {
  this.client.connect();
  this.input.setController(this.controller);
  this.input.start();
  this.viewport.initialize();
}

Game.prototype.update = function() {
  this.input.update();
  this.viewport.render();
}
