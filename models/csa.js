var baseModel = require('./base');

require('./boundary');

var Csa = baseModel.Model.extend({
  tableName: 'boundaries.csas',
  layer: function() {
    return this.belongsTo('Boundary');
  }
});

module.exports = baseModel.model('Csa', Csa);
