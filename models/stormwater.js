var baseModel = require('./base');

require('./layer');

var Stormwater = baseModel.Model.extend({
  tableName: 'layers.stormwaters',
  layer: function() {
    return this.belongsTo('Layer');
  }
});

module.exports = baseModel.model('Stormwater', Stormwater);
