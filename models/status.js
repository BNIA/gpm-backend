var baseModel = require('./base');

var Status = baseModel.Model.extend({
  tableName: 'statuses',
  stormwaters: function() {
    return this.hasMany('Stormwater');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var Statuses = baseModel.Collection.extend({model: Status});

module.exports = {
  Status: baseModel.model('Status', Status),
  Statuses: baseModel.collection('Statuses', Statuses)
};
