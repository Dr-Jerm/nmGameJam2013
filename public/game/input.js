// Input instantiates event handlers when created.
// document.onkeydown/document.onkeyup will use these functions
// directly from the instance of this class

function Input() {
  this.pressedKeys = [];
  this.controller;
  var _this = this;

  this.start = function() {
    document.onkeydown = _this.handleKeyDown;
    document.onkeyup   = _this.handleKeyUp;
  }

  this.setController = function(controller) {
    _this.controller = controller;
  }

  this.handleKeyDown = function(event) {
    _this.pressedKeys[event.keyCode] = true;  
  }

  this.handleKeyUp   = function(event) {
    _this.pressedKeys[event.keyCode] = false;
  }

  // Update here. Perhaps pass in an object to listen to.
  this.update = function() {
    _this.controller.handleInput(_this.pressedKeys);
  }
}
