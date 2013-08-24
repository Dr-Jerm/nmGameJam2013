// Actions are used to control Players in a game, if they are 
// AI controlled or human controlled.
// This abstracts input controls from the game mechanics themselves

function Action() { }

Action.prototype.execute = function() {
}

function Up() { Action.call(this); }
Up.prototype = new Action();
Up.prototype.constructor = Up;

Up.prototype.execute = function() {
  game.player.moveUp();
}

function Left() { Action.call(this); }
Left.prototype = new Action();
Left.prototype.constructor = Left;

Left.prototype.execute = function() {
  socket.emit("left", {"uid": config.uid})
}

function Down() { Action.call(this); }
Down.prototype = new Action();
Down.prototype.constructor = Down;

Down.prototype.execute = function() {
  socket.emit("down", {"uid": config.uid});
}

function Right() { Action.call(this); }
Right.prototype = new Action();
Right.prototype.constructor = Right;

Right.prototype.execute = function() {
  socket.emit("right", {"uid": config.uid});
}
