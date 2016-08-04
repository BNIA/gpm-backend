var baseModel = require('./base');

var Status = baseModel.Model.extend({
  tableName: 'statuses',
  visible: ['name', 'description'],
  stormwaterRemediationSites: function() {
    return this.hasMany('StormwaterRemediationSite');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var Statuses = baseModel.Collection.extend({
  model: Status
});

module.exports = {
  Status: baseModel.model('Status', Status),
  Statuses: baseModel.collection('Statuses', Statuses)
};
