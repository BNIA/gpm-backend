var baseModel = require('./base');

require('./boundary');

var Nsa = baseModel.Model.extend({
  tableName: 'boundaries.nsas',
  layer: function() {
    return this.belongsTo('Boundary');
  }
});

module.exports = baseModel.model('Nsa', Nsa);
