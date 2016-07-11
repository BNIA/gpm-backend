var baseModel = require('./base');

var Boundary = baseModel.Model.extend({
  tableName: 'boundaries'
});

module.exports = baseModel.model('Boundary', Boundary);
