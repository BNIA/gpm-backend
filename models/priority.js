var baseModel = require('./base');

var Priority = baseModel.Model.extend({
  tableName: 'priorities',
  visible: ['name', 'description'],
  stormwaterRemediationSites: function() {
    return this.hasMany('StormwaterRemediationSite');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilteOptionr', 'layer_filter');
  }
});

var Priorities = baseModel.Collection.extend({
  model: Priority
});

module.exports = {
  Priority: baseModel.model('Priority', Priority),
  Priorities: baseModel.collection('Priorities', Priorities)
};
