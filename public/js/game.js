// Game should acquire only the functions that it needs from the server
// This will be implemented later in the future

function Game() {
  this.view  = new View();
  this.input = new Input();
  this.controller = new Controller();
  this.input.setController(this.controller);
}

Game.prototype.start = function() {
  this.view.start();
  this.input.start();
  this.view.appendToDocument(document);
}

Game.prototype.update = function() {
  this.view.update();
  this.input.update();
}
