var Model = module.exports = function() {
}
Model.DB = require('../lib/db.js');

Model.prototype.save = function() {
  // TODO: Not async safe; Fix this
  console.log("model being saved " +this.name + ", " + this.id);
  Model.DB.save(this.name, this);
}

Model.findBy = function(model, label, value) {
  return Model.DB.find(model, label, value);
}
