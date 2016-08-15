import map from 'lodash/map';

export default class BoundariesService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/boundaries';
    this._downloadBoundariesUrl = '/api/boundaries/download';
    this._boundaryDetailUrl = "/api/boundaries/boundary_detail";
  }

  getBoundaryDetail(boundaryData) {
    var query = JSON.stringify({id: boundaryData.Id});
    return this.$http.post(this._boundaryDetailUrl, query)
      .then(this._extractBoundaryDetailData)
      .catch(this._handleError);
  }

  getDownload(boundaryData, fileType) {
    var query = JSON.stringify({
      type: fileType,
      ids: this._preprocessBoundaryIds(boundaryData)
    });
    return this.$http.post(this._downloadBoundariesUrl, query)
      .then(this._extractDownloadData)
      .catch(this._handleError);
  }

  _preprocessBoundaryIds(data) {
    data = data || {};
    return map(data, d => d.properties.Id);
  }

  _extractBoundaryDetailData(data) {
    data = data.data || {};
    if (data['Images Public Id']) {
      data['Images Public Id'] = map(data['Images Public Id'], p => {
        return {public_id: p};
      });
    }
    data.class = 'Boundary';
    return data;
  }

  _extractDownloadData(data) {
    data = data.data || {};
    return data;
  }

  _handleError(error) {
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

BoundariesService.$inject = ["$http"];
