var baseModel = require('./base');

var LayerFilterOption = baseModel.Model.extend({
  tableName: 'layer_filter_options',
  layerFilter: function() {
    return this.morphTo(
      'layer_filter',
      'SiteUse',
      'BmpType',
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
