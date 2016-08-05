var baseModel = require('./base');

var CommunityManagedOpenSpace = baseModel.Model.extend({
  tableName: 'community_managed_open_spaces',
  hasTimestamps: true,
  visible: ['name', 'address', 'block', 'lot'],
  prettyValues: ['name', 'address'],
  layer: function() {
    return this.morphOne('Layer', 'layer_detail');
  },
  siteUses: function() {
    return this.belongsToMany('SiteUse');
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
