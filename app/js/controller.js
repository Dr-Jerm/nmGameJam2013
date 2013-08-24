// Controller acts as the interface between Player and between input
// Can also act as interface between AI and Player

function Controller() {

  var _this = this;

  this.keyMap = {
    38 : new Up(),
    87 : new Up(),
    37 : new Left(),
    65 : new Left(),
    40 : new Down(),
    83 : new Down(),
    39 : new Right(),
    68 : new Right(),
  }

  this.handleInput = function(pressedKeys) {
    for (key in pressedKeys) {
      if (pressedKeys[key] && this.keyMap[key]) {
        this.keyMap[key].execute();
      }
    }
  }

}
