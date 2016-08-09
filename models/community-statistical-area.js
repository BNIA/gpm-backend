var baseModel = require('./base');

var CommunityStatisticalArea = baseModel.Model.extend({
  tableName: 'community_statistical_areas',
  hasTimestamps: true,
  boundary: function() {
    return this.belongsTo('Boundary');
  },
  layers: function() {
    return this.hasMany('Layer');
  },
  vitalSignsDataPoint() {
    return this.belongsTo('VitalSignsDataPoint');
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
