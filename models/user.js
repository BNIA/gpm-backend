var baseModel = require('./base');

var User = baseModel.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  verifyPassword: function(password) {
    return this.get('password') === password;
  }
});

var $1s = baseModel.Collection.extend({model: $1});

module.exports = {$1: $1, $1s: $1s}; 
