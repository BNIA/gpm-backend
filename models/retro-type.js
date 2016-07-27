var baseModel = require('./base');

var RetroType = baseModel.Model.extend({
  tableName: 'retro_types',
  stormwaters: function() {
    return this.hasMany('Stormwater');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var RetroTypes = baseModel.Collection.extend({model: RetroType});

module.exports = {
  RetroType: baseModel.model('RetroType', RetroType),
  RetroTypes: baseModel.collection('RetroTypes', RetroTypes)
};
