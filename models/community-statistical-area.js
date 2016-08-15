var baseModel = require('./base');

var CommunityStatisticalArea = baseModel.Model.extend({
  tableName: 'community_statistical_areas',
  hasTimestamps: true,
  boundary: function() {
    return this.morphOne('Boundary', 'boundary_detail');
  },
  layers: function() {
    return this.hasMany('Layer');
  },
  vitalSignsDataPoints() {
    return this.hasMany('VitalSignsDataPoint');
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
