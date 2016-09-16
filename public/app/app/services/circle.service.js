export default class CircleService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/circle';
  }
  getCircle(data) {
    var query = JSON.stringify({
      point: data
    });
    return this.$http.post(this._url, query)
      .then(this._extractCircleData, this._handleError);
  }

  _extractCircleData(data) {
    return data.data || {};
  }
  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

CircleService.$inject = ["$http"];
