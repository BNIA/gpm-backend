import map from 'lodash/map';

export default class BoundariesService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/boundaries';
    this._downloadBoundariesUrl = '/api/boundaries/download';
    this._boundaryDetailUrl = "/api/boundaries/boundary_detail";
  }

  getBoundaryDetail(boundaryData) {
    console.log('service.boundaries getBoundaryDetail');
    var query = JSON.stringify({id: boundaryData.Id});
    return this.$http.post(this._boundaryDetailUrl, query)
      .then(this._extractBoundaryDetailData)
      .catch(this._handleError);
  }

  getDownload(boundaryData, fileType) {
    console.log('service.boundaries getDownload');
    var query = JSON.stringify({
      type: fileType,
      ids: this._preprocessBoundaryIds(boundaryData)
    });
    return this.$http.post(this._downloadBoundariesUrl, query)
      .then(this._extractDownloadData)
      .catch(this._handleError);
  }

  _preprocessBoundaryIds(data) {
    console.log('service.boundaries preprocessBoundaryIds');
    data = data || {};
    return map(data, d => d.properties.Id);
  }

  _extractBoundaryDetailData(data) {
    console.log('extractBoundaryDetailData');
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
    console.log('service.boundaries extractDownloadData');
    data = data.data || {};
    return data;
  }

  _handleError(error) {
    console.log('service.boundaries handleError');
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

BoundariesService.$inject = ["$http"];
