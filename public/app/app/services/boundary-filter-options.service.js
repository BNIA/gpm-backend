import groupBy from 'lodash/groupBy';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import filter from 'lodash/filter';
import union from 'lodash/union';
import forEach from 'lodash/forEach';
import kebabCase from 'lodash/kebabCase';
import sample from 'lodash/sample';

export default class BoundaryFilterOptionsService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/boundary-filter-options';
    this._boundariesUrl = '/api/boundary-filter-options/boundaries';
  }

  getBoundaryFilterOptions() {
    return this.$http.get(this._url)
      .then(this._extractBoundaryFilterOptionsData, this._handleError);
  }

  getBoundaryFilters() {
    return this.$http.get(this._url)
      .then(this._extractBoundaryFiltersData, this._handleError);
  }

  getBoundaries(data) {
    var ids = this._preprocessBoundaryFiltersData(data);
    var query = {
      ids: JSON.stringify(ids)
    };
    return this.$http.post(this._boundariesUrl, query)
      .then(this._extractBoundariesData)
      .catch(this._handleError);
  }

  _preprocessBoundaryFiltersData(data) {
    var ids = reduce(data, (res, val, key) => {
      var sub = [];
      if (val.on) {
        forEach(val.data, v => {
          if (v.on === true) {
            sub.push(v.Id);
          }
        });
      }
      res = union(res, sub);
      return res;
    }, []);
    return ids;
  }

  _extractBoundaryFilterOptionsData(data) {
    data = data.data || {};
    return data;
  }

  _extractBoundaryFiltersData(data) {
    data = data.data || {};

    data = map(data, d => {
      d.on = true;
      d.class = 'Boundary Filter Option';
      return d;
    });

    var groups = groupBy(data, 'Boundary Detail Type');
    groups = reduce(groups, (res, v, k) => {
      res[k] = {
        on: false,
        class: 'Boundary Filter',
        data: v
      };
      return res;
    }, {});
    return groups;
  }

  _extractBoundariesData(data) {
    data = data.data || {};

    data = {
      data: data,
      style: function(feature) {
        var fillColor;
        var bdt = feature.properties['Boundary Detail Type'];

        if (bdt === 'Community Statistical Areas') {
          fillColor = 'red';
        } else if (bdt === 'Neighborhood Statistical Areas') {
          fillColor = 'green';
        } else if (bdt === 'Subwatersheds') {
          fillColor = 'blue';
        }

        return {
          fillColor: fillColor,
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      }
    };

    return data;
    // var len = data.length;
    // var markers = map(data, d => {
    //   var m = {
    //     lat: parseFloat(d.properties.Latitude),
    //     lng: parseFloat(d.properties.Longitude),
    //     properties: d.properties
    //   };
    //   m.icon = {
    //     type: 'div',
    //     iconSize: [12, 12],
    //     className: processClassName(d),
    //     iconAnchor: [6, 6]
    //   };
    //   if (len > 500) {
    //     m.group = 'boundaries';
    //   }
    //   return m;
    // });
    // return markers;
    return null;
  }

  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

BoundaryFilterOptionsService.$inject = ["$http"];
