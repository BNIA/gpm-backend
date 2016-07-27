var baseModel = require('./base');

require('./layer');

var Stormwater = baseModel.Model.extend({
  tableName: 'stormwaters',
  hasTimestamps: true,
  layer: function() {
    return this.morphOne('Layer', 'layer_detail');
  },
  bmpTypes: function() {
    return this.belongsToMany('BmpType');
  }
});

var Stormwaters = baseModel.Collection.extend({model: Stormwater});

module.exports = {
  Stormwater: baseModel.model('Stormwater', Stormwater),
  Stormwaters: baseModel.collection('Stormwaters', Stormwaters)
};
