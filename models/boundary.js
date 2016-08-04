var baseModel = require('./base');

var Boundary = baseModel.Model.extend({
  tableName: 'boundaries',
  hasTimestamps: true,
  visible: ['name']
});

var Boundaries = baseModel.Collection.extend({model: Boundary});

module.exports = {
  Boundary: baseModel.model('Boundary', Boundary),
  Boundaries: baseModel.collection('Boundaries', Boundaries)
};
