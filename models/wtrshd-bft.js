var baseModel = require('./base');

var WtrshdBft = baseModel.Model.extend({
  tableName: 'wtrshd_bfts',
  stormwaters: function() {
    return this.hasMany('Stormwater');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var WtrshdBfts = baseModel.Collection.extend({model: WtrshdBft});

module.exports = {
  WtrshdBft: baseModel.model('WtrshdBft', WtrshdBft),
  WtrshdBfts: baseModel.collection('WtrshdBfts', WtrshdBfts)
};
