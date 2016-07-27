var baseModel = require('./base');

var Image = baseModel.Model.extend({
  tableName: 'images',
  hasTimestamps: true,
  layer: function() {
    return this.belongsTo('Layer');
  }
});

var Images = baseModel.Collection.extend({model: Image});

module.exports = {
  Image: baseModel.model('Image', Image),
  Images: baseModel.collection('Images', Images)
};
