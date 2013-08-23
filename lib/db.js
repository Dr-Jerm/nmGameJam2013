var fake_db = {
  user: {},
}

var DB = module.exports = {
  save: function(model, instance) {
    fake_db[model][instance.id] = instance;
    console.log("model was: " + model + ", email: " + 
      fake_db[model][instance.id].email + ", id: " + 
      fake_db[model][instance.id].id);
  },
  find: function(model, field, value) {
    // TODO: Complete the ability to find a user.
    for (m in fake_db[model]) {
      var result = fake_db[model][m];
      if (result[field] == value) {
        return result;
      }
    }
    return null;
  }
};
