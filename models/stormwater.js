var baseModel = require('./base');
var _ = require('lodash');

require('./layer');

var StormwaterRemediationSite = baseModel.Model.extend({
  tableName: 'stormwaters',
  hasTimestamps: true,
  visible: [
    'name',
    'address',
    'site_use',
    'drain_acres',
    'imp_acres',
    'imp_percent',
    'an_runoff'
  ],
  pretty: {
    imp_acres: 'Impervious Acres',
    imp_percent: 'Impervious Percent',
    an_runoff: 'Annual Runoff'
  },
  layer: function() {
    return this.morphOne('Layer', 'layer_detail');
  },
  bestManagementPractices: function() {
    return this.belongsToMany(
      'BestManagementPractice',
      'bmp_types_stormwaters'
    );
  },
  status: function() {
    return this.belongsTo('Status');
  },
  retrofitType: function() {
    return this.belongsTo('RetrofitType');
  },
  feasability: function() {
    return this.belongsTo('Feasability');
  },
  designDifficulty: function() {
    return this.belongsTo('DesignDifficulty');
  },
  watershedBenefit: function() {
    return this.belongsTo('WatershedBenefit');
  },
  priority: function() {
    return this.belongsTo('Priority');
  }
});

var StormwaterRemediationSites = baseModel.Collection.extend({
  model: StormwaterRemediationSite
});

module.exports = {
  StormwaterRemediationSite:
  baseModel.model('StormwaterRemediationSite', StormwaterRemediationSite),
  StormwaterRemediationSites:
  baseModel.collection('StormwaterRemediationSites', StormwaterRemediationSites)
};
