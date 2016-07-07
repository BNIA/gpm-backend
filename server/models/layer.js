var myBookshelf = require('./base');

var Layer = myBookshelf.Model.extend({
  tableName: 'layers'
});

var Layers = myBookshelf.Collection.extend({
  model: Layer
});

module.exports = {
  Layer: myBookshelf.model('Layer', Layer),
  Layers: myBookshelf.collection('Layers', Layers)
};
