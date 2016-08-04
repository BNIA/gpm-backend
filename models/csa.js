var baseModel = require('./base');

require('./boundary');

var CommunityStatisticalArea = baseModel.Model.extend({
  tableName: 'csas',
  hasTimestamps: true,
  boundary: function() {
    return this.belongsTo('Boundary');
  },
  layers: function() {
    return this.hasMany('Layer');
  }
});

var CommunityStatisticalAreas = baseModel.Collection.extend({
  model: CommunityStatisticalArea
});

module.exports = {
  CommunityStatisticalArea:
  baseModel.model('CommunityStatisticalArea', CommunityStatisticalArea),
  CommunityStatisticalAreas:
  baseModel.collection('CommunityStatisticalAreas', CommunityStatisticalAreas)
};
