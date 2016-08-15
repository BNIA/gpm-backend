var baseModel = require('./base');

var VitalSignsIndicator = baseModel.Model.extend({
  tableName: 'vital_signs_indicators',
  visible: ['name', 'source_name', 'description', 'id'],
  vitalSignsSection: function() {
    return this.belongsTo('VitalSignsSection');
  },
  vitalSignsDataPoint: function() {
    return this.hasMany('VitalSignsDataPoint');
  },
  vitalSignsDataBreaks: function() {
    return this.hasMany('VitalSignsDataBreak');
  }
});

var VitalSignsIndicators = baseModel.Collection.extend({
  model: VitalSignsIndicator
});

module.exports = {
  VitalSignsIndicator: baseModel.model('VitalSignsIndicator',
  VitalSignsIndicator),
  VitalSignsIndicators: baseModel.collection(
    'VitalSignsIndicators', VitalSignsIndicators
  )
};
