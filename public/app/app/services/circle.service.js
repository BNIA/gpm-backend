export default class CircleService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/circle';
  }
  getCircle(data) {
console.log('services.cirlce getCircle');
    var query = JSON.stringify({
      point: data
    });
    return this.$http.post(this._url, query)
      .then(this._extractCircleData, this._handleError);
  }

  _extractCircleData(data) {
console.log('services.circle extractCircleData');
    return data.data || {};
  }
  _handleError(error) {
console.log('services.circle error');
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

CircleService.$inject = ["$http"];
