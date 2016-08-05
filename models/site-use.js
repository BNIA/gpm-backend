var baseModel = require('./base');

var SiteUse = baseModel.Model.extend({
  tableName: 'site_uses',
  visible: ['name', 'description'],
  prettyValues: ['name'],
  communityManagedOpenSpaces: function() {
    return this.belongsToMany('CommunityManagedOpenSpace');
  },
  layerFilter: function() {
    return this.morphOne('LayerFilterOption', 'layer_filter');
  }
});

var SiteUses = baseModel.Collection.extend({
  model: SiteUse
});

module.exports = {
  SiteUse: baseModel.model('SiteUse', SiteUse),
  SiteUses: baseModel.collection('SiteUses', SiteUses)
};
