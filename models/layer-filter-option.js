var baseModel = require('./base');

var LayerFilterOption = baseModel.Model.extend({
  tableName: 'layer_filter_options',
  visible: ['layer_filter_type', 'layer_detail_type'],
  layerFilter: function() {
    return this.morphTo(
      'layer_filter',
      'SiteUse',
      'BestManagementPractice',
      'Status',
      'RetroType',
      'WtrshdBft',
      'Priority',
      'DsgnDfclt',
      'Feasability',
      'Source'
    );
  }
});

var LayerFilterOptions = baseModel.Collection.extend({
  model: LayerFilterOption
});

module.exports = {
  LayerFilterOption: baseModel.model('LayerFilterOption', LayerFilterOption),
  LayerFilterOptions: baseModel.collection(
    'LayerFilterOptions', LayerFilterOptions
  )
};
