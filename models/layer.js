var baseModel = require('./base');
var _ = require('lodash');

var Layer = baseModel.Model.extend({
  tableName: 'layers',
  hasTimestamps: true,
  visible: ['layer_detail_type', 'longitude', 'latitude'],
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
  },
  virtuals: {
    longitude: function(self) {
      self = self || this;
      var g = self.get('geojson');
      return _.isNil(g) ? null : g.coordinates[0];
    },
    latitude: function(self) {
      self = self || this;
      var g = self.get('geojson');
      return _.isNil(g) ? null : g.coordinates[1];
    }
  },
  toGeoJSON: function(options) {
    options = options || {};
    var obj = this.serialize(options);
    obj = _.omit(obj, ['geojson', 'latitude', 'longitude']);

    var geo = this.get('geojson') || {};
    return {
      type: 'Feature',
      geometry: geo,
      properties: obj
    };
  }
});

var Layers = baseModel.Collection.extend({
  model: Layer,
  prettyName: 'Layers',
  toGeoJSON(options) {
    options = options || {};
    var features = _.map(this.models, m => {
      return m.toGeoJSON(options);
    });
    return {
      type: 'FeatureCollection',
      features: features
    };
  }
});

// Layer.prototype.Collection = Layers;

module.exports = {
  Layer: baseModel.model('Layer', Layer),
  Layers: baseModel.collection('Layers', Layers)
};
