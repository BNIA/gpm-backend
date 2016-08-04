var baseModel = require('./base');

var CommunityManagedOpenSpace = baseModel.Model.extend({
  tableName: 'CommunityManagedOpenSpaces',
  hasTimestamps: true,
  visible: ['name', 'description'],
  layer: function() {
    return this.morphOne('Layer', 'layer_detail');
  },
  siteUses: function() {
    return this.belongsToMany(
    'SiteUse',
    'cmoss_site_uses',
    'cmos_id',
    'site_use_id');
  }
});

var CommunityManagedOpenSpaces = baseModel.Collection.extend({
  model: CommunityManagedOpenSpace
});

module.exports = {
  CommunityManagedOpenSpace:
  baseModel.model('CommunityManagedOpenSpace', CommunityManagedOpenSpace),
  CommunityManagedOpenSpaces:
  baseModel.collection('CommunityManagedOpenSpaces', CommunityManagedOpenSpaces)
};
