var baseModel = require('./base');

require('./boundary');

var NeighborhoodStatisticalArea = baseModel.Model.extend({
  tableName: 'nsas',
  hasTimestamps: true,
  visible: ['name', 'description'],
  boundary: function() {
    return this.belongsTo('Boundary');
  },
  layers: function() {
    return this.hasMany('Layer');
  }
});

var NeighborhoodStatisticalAreas = baseModel.Collection.extend({
  model: NeighborhoodStatisticalArea
});

module.exports = {
  NeighborhoodStatisticalArea:
  baseModel.model('NeighborhoodStatisticalArea',
  NeighborhoodStatisticalArea),
  NeighborhoodStatisticalAreas:
  baseModel.collection('NeighborhoodStatisticalAreas',
  NeighborhoodStatisticalAreas)
};
