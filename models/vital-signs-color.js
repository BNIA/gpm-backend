var baseModel = require('./base');

var VitalSignsColor = baseModel.Model.extend({
  tableName: 'vital_signs_colors',
  visible: ['value', 'break_number'],
  vitalSignsSection: function() {
    return this.belongsTo('VitalSignsSection');
  },
  vitalSignsDataBreaks: function() {
    return this.hasMany('VitalSignsDataBreak');
  }
});

var VitalSignsColors = baseModel.Collection.extend({
  model: VitalSignsColor
});

module.exports = {
  VitalSignsColor: baseModel.model('VitalSignsColor', VitalSignsColor),
  VitalSignsColors: baseModel.collection(
    'VitalSignsColors', VitalSignsColors
  )
};
