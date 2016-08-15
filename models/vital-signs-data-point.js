var baseModel = require('./base');
var _ = require('lodash');

var VitalSignsDataPoint = baseModel.Model.extend({
  tableName: 'vital_signs_data_points',
  visible: ['value', 'break_number'],
  vitalSignsIndicator: function() {
    return this.belongsTo('VitalSignsIndicator');
  },
  vitalSignsDataBreak: function() {
    return this.belongsTo('VitalSignsDataBreak');
  },
  communityStatisticalArea: function() {
    return this.belongsTo('CommunityStatisticalArea');
  },
  toGeoJSON(options) {
    options = options || {};
    options = _.assign(options, {
      pretty: false,
      collapse: false
    });
    var csa = this.related('communityStatisticalArea');
    var boundary = csa.related('boundary');
    var geo = boundary.get('geojson');
    var obj = this.serialize(options);
    obj = _.omit(obj, ['CommunityStatisticalArea.boundary.geojson']);
    geo.properties = obj;
    return geo || {};
  }
});

var VitalSignsDataPoints = baseModel.Collection.extend({
  model: VitalSignsDataPoint,
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
  VitalSignsDataPoint: baseModel.model('VitalSignsDataPoint',
  VitalSignsDataPoint),
  VitalSignsDataPoints: baseModel.collection(
    'VitalSignsDataPoints', VitalSignsDataPoints
  )
};
