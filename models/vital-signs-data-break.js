var baseModel = require('./base');

var VitalSignsDataBreak = baseModel.Model.extend({
  tableName: 'vital_signs_data_breaks',
  visible: ['upper_bound', 'lower_bound', 'break_number'],
  vitalSignsIndicator: function() {
    return this.belongsTo('VitalSignsIndicator');
  },
  vitalSignsColor: function() {
    return this.belongsTo('VitalSignsColor');
  }
});

var VitalSignsDataBreaks = baseModel.Collection.extend({
  model: VitalSignsDataBreak
});

module.exports = {
  VitalSignsDataBreak: baseModel.model(
    'VitalSignsDataBreak', VitalSignsDataBreak
  ),
  VitalSignsDataBreaks: baseModel.collection(
    'VitalSignsDataBreaks', VitalSignsDataBreaks
  )
};
