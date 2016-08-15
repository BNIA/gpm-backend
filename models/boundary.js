var baseModel = require('./base');
var _ = require('lodash');

var Boundary = baseModel.Model.extend({
  tableName: 'boundaries',
  hasTimestamps: true,
  visible: ['id', 'name', 'boundary_detail_type'],
  prettyValues: ['boundary_detail_type'],
  boundaryDetail: function() {
    return this.morphTo(
      'boundary_detail',
      'CommunityStatisticalArea',
      'NeighborhoodStatisticalArea',
      'Subwatershed'
    );
  },
  toGeoJSON: function(options) {
    options = options || {};
    var obj = this.serialize(options);
    obj = _.omit(obj, ['geojson']);

    var geo = this.get('geojson') || {};
    geo.properties = obj;
    return geo;
  }
});

var Boundaries = baseModel.Collection.extend({
  model: Boundary,
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

module.exports = {
  Boundary: baseModel.model('Boundary', Boundary),
  Boundaries: baseModel.collection('Boundaries', Boundaries)
};
