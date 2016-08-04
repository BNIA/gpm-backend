var baseModel = require('./base');

var Feasability = baseModel.Model.extend({
  tableName: 'feasabilities',
  visible: ['name', 'description'],
  prettyValues: ['name'],
  stormwaterRemediationSites: function() {
    return this.hasMany('StormwaterRemediationSite');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var Feasabilities = baseModel.Collection.extend({
  model: Feasability,
  prettyName: 'Feasabilities'
});

module.exports = {
  Feasability: baseModel.model('Feasability', Feasability),
  Feasabilities: baseModel.collection('Feasabilities', Feasabilities)
};
