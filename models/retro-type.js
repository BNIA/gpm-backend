var baseModel = require('./base');

var RetrofitType = baseModel.Model.extend({
  tableName: 'retro_types',
  visible: ['name', 'description'],
  stormwaterRemediationSites: function() {
    return this.hasMany('StormwaterRemediationSite');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var RetrofitTypes = baseModel.Collection.extend({
  model: RetrofitType
});

module.exports = {
  RetrofitType: baseModel.model('RetrofitType', RetrofitType),
  RetrofitTypes: baseModel.collection('RetrofitTypes', RetrofitTypes)
};
