import groupBy from 'lodash/groupBy';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import filter from 'lodash/filter';
import union from 'lodash/union';
import kebabCase from 'lodash/kebabCase';

var processClassName = function(layer) {
  var c = 'layer-point';
  c += ' ' + kebabCase(layer.properties["Layer Detail Type"]) + '-layer';
  if (layer.properties['Layer Detail'] &&
  layer.properties['Layer Detail'].Status) {
    var status = layer.properties['Layer Detail'].Status;
    if (status.Name === 'Active') {
      c += " var-1";
    } else if (status.Name === 'Identified') {
      c += " var-2";
    }
  }
  return c;
};

export default class LayerFilterOptionsService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/layer-filter-options';
    this._layersUrl = '/api/layer-filter-options/layers';
  }

  getLayerFilterOptions() {
    return this.$http.get(this._url)
      .then(this._extractLayerFilterOptionsData, this._handleError);
  }

  getLayerFilters() {
    return this.$http.get(this._url)
      .then(this._extractLayerFiltersData, this._handleError);
  }

  getLayers(data, options) {
    options = options || {};
    console.log(options);
    var ids = this._preprocessLayerFiltersData(data);
    var query = {
      ids: JSON.stringify(ids),
      options: JSON.stringify(options)
    };
    return this.$http.post(this._layersUrl, query)
      .then(this._extractLayersData)
      .catch(this._handleError);
  }

  _preprocessLayerFiltersData(data) {
    var ids = reduce(data, (res, val, key) => {
      var sub = reduce(val, (r, v, k) => {
        if (k !== 'class') {
          var ons = filter(v, {on: true});
          var subIds = map(ons, 'Id');
          r = union(r, subIds);
        }
        return r;
      }, []);
      res = union(res, sub);
      return res;
    }, []);
    return ids;
  }

  _extractLayerFilterOptionsData(data) {
    data = data.data || {};
    return data;
  }

  _extractLayerFiltersData(data) {
    data = data.data || {};

    data = map(data, d => {
      d.on = false;
      d.class = 'Layer Filter Option';
      return d;
    });

    var groups = groupBy(data, 'Layer Detail Type');

    groups = reduce(groups, (res, v, k) => {
      var g = groupBy(v, 'Layer Filter Type');
      g.class = 'Layer Filter';
      res[k] = g;
      return res;
    }, {});

    return groups;
  }

  _extractLayersData(data) {
    data = data.data.features || {};
    var len = data.length;
    var markers = map(data, d => {
      var m = {
        lat: parseFloat(d.properties.Latitude),
        lng: parseFloat(d.properties.Longitude),
        properties: d.properties
      };
      m.icon = {
        type: 'div',
        iconSize: [12, 12],
        className: processClassName(d),
        iconAnchor: [6, 6]
      };
      if (len > 500) {
        m.group = 'layers';
      }
      return m;
    });
    return markers;
  }

  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

LayerFilterOptionsService.$inject = ["$http"];
