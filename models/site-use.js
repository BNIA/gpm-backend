var baseModel = require('./base');

var SiteUse = baseModel.Model.extend({
  tableName: 'site_uses',
  visible: ['name', 'description'],
  CommunityManagesOpenSpaces: function() {
    return this.belongsToMany('CommunityManagedOpenSpace',
    'cmoss_site_uses', 'site_use_id', 'cmos_id');
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
