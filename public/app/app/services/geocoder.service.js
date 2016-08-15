import map from 'lodash/map';

export default class GeocoderService {
  constructor($http) {
    this.$http = $http;
    this._url = 'https://maps.googleapis.com/maps/api/geocode/json';
    this._apiKey = 'AIzaSyBogBsbmFOnMyqU01S-PszxTxxfp4vsGB8';
  }
  geocode(address) {
    return this.$http.get(this._url, {params: {
      address: address,
      key: this._apiKey
    }})
      .then(this._extractGeodata)
      .catch(this._handleError);
  }
  _extractGeodata(data) {
    data = data.data.results || [];
    console.log(data);
    return data;
  }
  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

GeocoderService.$inject = ["$http"];
