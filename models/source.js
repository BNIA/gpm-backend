var baseModel = require('./base');

var Source = baseModel.Model.extend({
  tableName: 'sources',
  visible: ['name', 'description'],
  layers: function() {
    return this.belongsToMany('Layer');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var Sources = baseModel.Collection.extend({
  model: Source
});

module.exports = {
  Source: baseModel.model('Source', Source),
  Sources: baseModel.collection('Sources', Sources)
};
