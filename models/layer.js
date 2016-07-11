var baseModel = require('./base');

var Layer = baseModel.Model.extend({
  tableName: 'layers'
});

module.exports = baseModel.model('Layer', Layer);
