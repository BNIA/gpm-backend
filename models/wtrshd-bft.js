var baseModel = require('./base');

var WatershedBenefit = baseModel.Model.extend({
  tableName: 'wtrshd_bfts',
  visible: ['name', 'description'],
  stormwaterRemediationSites: function() {
    return this.hasMany('StormwaterRemediationSite');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var WatershedBenefits = baseModel.Collection.extend({
  model: WatershedBenefit
});

module.exports = {
  WatershedBenefit:
  baseModel.model('WatershedBenefit', WatershedBenefit),
  WatershedBenefits:
  baseModel.collection('WatershedBenefits', WatershedBenefits)
};
