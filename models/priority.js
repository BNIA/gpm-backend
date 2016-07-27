var baseModel = require('./base');

var Priority = baseModel.Model.extend({
  tableName: 'priorities',
  stormwaters: function() {
    return this.hasMany('Stormwater');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilteOptionr', 'layer_filter');
  }
});

var Priorities = baseModel.Collection.extend({model: Priority});

module.exports = {
  Priority: baseModel.model('Priority', Priority),
  Priorities: baseModel.collection('Priorities', Priorities)
};
