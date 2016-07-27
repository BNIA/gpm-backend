var baseModel = require('./base');

var BmpType = baseModel.Model.extend({
  tableName: 'bmp_types',
  stormwaters: function() {
    return this.belongsToMany('Stormwater');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var BmpTypes = baseModel.Collection.extend({model: BmpType});

module.exports = {
  BmpType: baseModel.model('BmpType', BmpType),
  BmpTypes: baseModel.collection('BmpTypes', BmpTypes)
};
