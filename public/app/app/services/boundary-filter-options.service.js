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
    this._boundariesUrl = '/api/boundary-filter-options/boundaries'; }

  getBoundaryFilterOptions() {
console.log('services.BFO getBoundaryFilterOptions()');
    return this.$http.get(this._url)
      .then(this._extractBoundaryFilterOptionsData, this._handleError);
  }

  getBoundaryFilters() {
console.log('services.BFO getBoundaryFilters');
    return this.$http.get(this._url)
      .then(this._extractBoundaryFiltersData, this._handleError);
  }

  getBoundaries(data) {
console.log('services.BFO getBoundaries');
    var ids = this._preprocessBoundaryFiltersData(data);
    var query = {
      ids: JSON.stringify(ids)
    };
    return this.$http.post(this._boundariesUrl, query)
      .then(this._extractBoundariesData)
      .catch(this._handleError);
  }

  _preprocessBoundaryFiltersData(data) {
console.log('services.BFO preprocessBoundaryFiltersData');
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
console.log('services.bfo extractboundaryfilteroptionsdata');
    data = data.data || {};
    return data;
  }

  _extractBoundaryFiltersData(data) {
console.log('serices.bfo extractboundaryfiltersdata');
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
console.log('services.bfo extractBoundariesData');
    data = data.data || {};
    data = {
      data: data,
      style: function(feature) {
        var bdt = null;
        var color = 'white';
        var fillColor;
        if (feature.properties && feature.properties['Boundary Detail Type']) {
          bdt = feature.properties['Boundary Detail Type'];
        }

        if (bdt === 'Community Statistical Areas') {
          fillColor = 'red';
        } else if (bdt === 'Neighborhood Statistical Areas') {
          fillColor = 'green';
        } else if (bdt === 'Subwatersheds') {
          fillColor = 'blue';
        } else {
          fillColor = 'rgba(0,0,0,.5)';
          color = 'black';
        }

        return {
          fillColor: fillColor,
          weight: 2,
          opacity: 1,
          color: color,
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
  }

  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log('services.bfo'+errMsg);
  }
}

BoundaryFilterOptionsService.$inject = ["$http"];
