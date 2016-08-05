import groupBy from 'lodash/groupBy';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import filter from 'lodash/filter';
import union from 'lodash/union';

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

  getLayers(data) {
    var ids = this._preprocessLayerFiltersData(data);
    var query = {
      ids: JSON.stringify(ids)
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
    console.log(ids);
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

    console.log(groups);

    return groups;
  }

  _extractLayersData(data) {
    data = data.data.features || {};
    var markers = map(data, d => {
      return {
        lat: parseFloat(d.properties.Latitude),
        lng: parseFloat(d.properties.Longitude),
        properties: d.properties
      };
    });
    console.log(markers);
    return markers;
  }

  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

LayerFilterOptionsService.$inject = ["$http"];
