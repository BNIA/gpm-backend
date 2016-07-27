var baseModel = require('./base');

var Layer = baseModel.Model.extend({
  tableName: 'layers',
  hasTimestamps: true,
  permittedAttributes: [
    'layer_detail_type',
    'geojson'
  ],
  layerDetail: function() {
    return this.morphTo('layer_detail', 'Cmos', 'Stormwater');
  },
  csa: function() {
    return this.belongsTo('Csa');
  },
  nsa: function() {
    return this.belongsTo("Nsa");
  },
  subwatershed: function() {
    return this.belongsTo('Subwatershed');
  },
  images: function() {
    return this.hasMany('Image');
  },
  sources: function() {
    return this.belongsToMany('Source');
  }
});

var Layers = baseModel.Collection.extend({model: Layer});

module.exports = {
  Layer: baseModel.model('Layer', Layer),
  Layers: baseModel.collection('Layers', Layers)
};
