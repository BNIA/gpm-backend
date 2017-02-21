import map from 'lodash/map';

export default class LayersService {
  constructor($http) {
    this.$http = $http;
    this._url = '/api/layers';
    this._downloadLayersUrl = '/api/layers/download';
    this._layerDetailUrl = "/api/layers/layer_detail";
  }

  getLayerDetail(layerData) {
console.log('services.layers getLayerDetail');
    var query = JSON.stringify({id: layerData.Id});
    return this.$http.post(this._layerDetailUrl, query)
      .then(this._extractLayerDetailData)
      .catch(this._handleError);
  }

  getDownload(layerData, fileType) {
console.log('services.layers getDownload');
    var query = JSON.stringify({
      type: fileType,
      ids: this._preprocessLayerIds(layerData)
    });
    return this.$http.post(this._downloadLayersUrl, query)
      .then(this._extractDownloadData)
      .catch(this._handleError);
  }

  _preprocessLayerIds(data) {
console.log('services.layers preprocesslayersids');
    data = data || {};
    return map(data, d => d.properties.Id);
  }

  _extractLayerDetailData(data) {
console.log('services.layers extractLayerDetailData');
    data = data.data || {};
    if (data['Images Public Id']) {
      data['Images Public Id'] = map(data['Images Public Id'], p => {
        return {public_id: p};
      });
    }
    data.class = 'Layer';
    return data;
  }

  _extractDownloadData(data) {
console.log('extractDownloadData');
    data = data.data || {};
    return data;
  }

  _handleError(error) {
console.log('handleError');
    let errMsg = error.message || 'Server error';
    console.log(errMsg);
  }
}

LayersService.$inject = ["$http"];
