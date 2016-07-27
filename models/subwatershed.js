var baseModel = require('./base');

require('./boundary');

var Subwatershed = baseModel.Model.extend({
  tableName: 'subwatersheds',
  hasTimestamps: true,
  boundary: function() {
    return this.belongsTo('Boundary');
  },
  layers: function() {
    return this.hasMany('Layer');
  }
});

var Subwatersheds = baseModel.Collection.extend({model: Subwatershed});

module.exports = {
  Subwatershed: baseModel.model('Subwatershed', Subwatershed),
  Subwatersheds: baseModel.collection('Subwatersheds', Subwatersheds)
};
