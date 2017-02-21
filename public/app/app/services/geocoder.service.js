import map from 'lodash/map';
import flatten from 'lodash/flatten';
import union from 'lodash/union';
import indexOf from 'lodash/indexOf';

export default class GeocoderService {
  constructor($http) {
    this.$http = $http;
    this._url = 'https://maps.googleapis.com/maps/api/geocode/';
    this._apiKey = 'AIzaSyBogBsbmFOnMyqU01S-PszxTxxfp4vsGB8';
  }
  geocode(address) {
console.log('geocode');
    var addrStr = 'address=' + encodeURIComponent(address);
    var keyStr = 'key=' + this._apiKey;
    var componentStr = 'components=locality:Baltimore|administrative_area:MD'

    var urlStr = this._url + "json?" + addrStr + '&' + keyStr + '&' +
    componentStr;
    return this.$http({
      method: 'GET',
      url: urlStr
    }).then(this._extractGeodata)
      .catch(this._handleError);
  }
  _extractGeodata(data) {
// console.log('services.geocoder extractGeoData');
    data = data.data.results || [];
    var types = map(data, d => {
      return map(d.address_components, a => {
        return a.types;
      });
    });
    types = union(flatten(flatten(types)));
    var res;
    if (indexOf(types, 'route') >= 0) {
      res = data;
    } else {
      res = [];
    }
    return res;
  }
  _handleError(error) {
console.log('services.geocoder error');
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

GeocoderService.$inject = ["$http"];
