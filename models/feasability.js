var baseModel = require('./base');

var Feasability = baseModel.Model.extend({
  tableName: 'feasabilities',
  stormwaters: function() {
    return this.hasMany('Stormwater');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var Feasabilities = baseModel.Collection.extend({model: Feasability});

module.exports = {
  Feasability: baseModel.model('Feasability', Feasability),
  Feasabilities: baseModel.collection('Feasabilities', Feasabilities)
};
