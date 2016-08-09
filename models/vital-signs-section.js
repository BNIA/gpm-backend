var baseModel = require('./base');

var VitalSignsSection = baseModel.Model.extend({
  tableName: 'vital_signs_sections',
  visible: ['name'],
  vitalSignsIndicators: function() {
    return this.hasMany('VitalSignsIndicator');
  },
  vitalSignsColors: function() {
    return this.hasMany('VitalSignsColor');
  }
});

var VitalSignsSections = baseModel.Collection.extend({
  model: VitalSignsSection
});

module.exports = {
  VitalSignsSection: baseModel.model('VitalSignsSection', VitalSignsSection),
  VitalSignsSections: baseModel.collection(
    'VitalSignsSections', VitalSignsSections
  )
};
