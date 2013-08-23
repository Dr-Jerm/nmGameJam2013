var Player = function(email, rememberToken) {
  this.email = email;
  this.rememberToken = rememberToken;
  this.actor = 0;
}

Player.prototype.setActor = function(actor) {
  this.actor = actor;
}
