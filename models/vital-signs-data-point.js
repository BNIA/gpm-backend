var baseModel = require('./base');

var VitalSignsDataPoint = baseModel.Model.extend({
  tableName: 'vital_signs_data_points',
  visible: ['value', 'break_number'],
  vitalSignsIndicator: function() {
    return this.belongsTo('VitalSignsSection');
  },
  vitalSignsDataBreak: function() {
    return this.belongsTo('VitalSignsDataBreak');
  },
  communityStatisticalArea: function() {
    return this.belongsTo('CommunityStatisticalArea');
  }
});

var VitalSignsDataPoints = baseModel.Collection.extend({
  model: VitalSignsDataPoint
});

module.exports = {
  VitalSignsDataPoint: baseModel.model('VitalSignsDataPoint',
  VitalSignsDataPoint),
  VitalSignsDataPoints: baseModel.collection(
    'VitalSignsDataPoints', VitalSignsDataPoints
  )
};
