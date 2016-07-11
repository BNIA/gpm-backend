var baseModel = require('./base');

require('./boundary');

var Subwatershed = baseModel.Model.extend({
  tableName: 'boundaries.subwatersheds',
  layer: function() {
    return this.belongsTo('Boundary');
  }
});

module.exports = baseModel.model('Subwatershed', Subwatershed);
