var baseModel = require('./base');

var SiteUse = baseModel.Model.extend({
  tableName: 'site_uses',
  cmoss: function() {
    return this.belongsToMany('Cmos');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var SiteUses = baseModel.Collection.extend({model: SiteUse});

module.exports = {
  SiteUse: baseModel.model('SiteUse', SiteUse),
  SiteUses: baseModel.collection('SiteUses', SiteUses)
};
