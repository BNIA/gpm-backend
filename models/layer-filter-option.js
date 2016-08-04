var baseModel = require('./base');

var proto = baseModel.Model.prototype;

var LayerFilterOption = baseModel.Model.extend({
  tableName: 'layer_filter_options',
  visible: ['id', 'layer_filter_type', 'layer_detail_type'],
  prettyValues: ['layer_filter_type'],
  layerFilter: function() {
    return this.morphTo(
      'layer_filter',
      ['layer_filter_type', 'layer_filter_id'],
      'SiteUse',
      'BestManagementPractice',
      'Status',
      'RetrofitType',
      'WatershedBenefit',
      'Priority',
      'DesignDifficulty',
      'Feasability',
      'Source'
    );
  },
  serialize: function(options) {
    var serialized = proto.serialize.call(this, options);
    if (this.pretty) {
      var prettyName = this.pretty.layer_detail_type;
      if (serialized[prettyName] === 'cmoss') {
        serialized[prettyName] = 'Community Managed Open Spaces';
      } else if (serialized[prettyName] === 'stormwaters') {
        serialized[prettyName] = 'Stormwater Remediation Sites';
      } else {
        serialized[prettyName] = 'Global';
      }

      prettyName = this.pretty.layer_filter_type;
      if (serialized[prettyName] === 'Bmp Types') {
        serialized[prettyName] = 'Best Management Practices';
      } else if (serialized[prettyName] === 'Retro Types') {
        serialized[prettyName] = 'Retrofit Types';
      } else if (serialized[prettyName] === 'Wtrshd Bfts') {
        serialized[prettyName] = 'Watershed Benefits';
      } else if (serialized[prettyName] === 'Dsgn Dfclts') {
        serialized[prettyName] = 'Design Difficulties';
      }
    }
    return serialized;
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
