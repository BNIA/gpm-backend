var baseModel = require('./base');

var DsgnDfclt = baseModel.Model.extend({
  tableName: 'dsgn_dfclts',
  stormwaters: function() {
    return this.hasMany('Stormwater');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var DsgnDfclts = baseModel.Collection.extend({model: DsgnDfclt});

module.exports = {
  DsgnDfclt: baseModel.model('DsgnDfclt', DsgnDfclt),
  DsgnDfclts: baseModel.collection('DsgnDfclts', DsgnDfclts)
};
