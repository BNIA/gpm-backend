import angular from 'angular';
// switch out tile-layers here
import {baltimore, cartodbPositron as tileChoice} from './parameters.js';

export default class AppController {
  constructor($scope, $rootScope, $element) {
    var self = this;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$element = $element;

    this.markers = [];
    this.geojson = {};

    angular.extend($scope, {
      baltimore: baltimore,
      defaults: {
        tileLayer: tileChoice.tileLayer,
        tileLayerOptions: tileChoice.tileLayerOptions,
        zoomControl: false
      }
    });

    this.$rootScope.$on('setLayers', (event, layers) => {
console.log('map-page-app-controller onSetLayer');
      this.onSetLayers(layers);
    });
    this.$rootScope.$on('setBoundaries', (event, boundaries) => {
      this.onSetBoundaries(boundaries);
console.log('map-page-app-controller onSetBoundaries');
    });
    this.$scope.$on('leafletDirectiveMarker.click', (event, marker) => {
      this.emitLayerClick(marker.model.properties || {});
console.log('map-page-app-controller emitLayerClick')
    });

    this.$scope.$on("leafletDirectiveGeoJson.mouseover", (ev, leafletPayload) => {
      console.log('map-page-app-controller leafletMouseover');
      self.emitBoundaryOver(
        leafletPayload.leafletObject.feature, leafletPayload.leafletEvent);
    });

    this.$scope.$on("leafletDirectiveGeoJson.mouseout", (ev) => {
      self.emitBoundaryOut(ev);
console.log('map-page-app-controller leafletmouseOut');
    });

  }
  emitLayerClick(layer) {
console.log('map-page-app-controller emitLayerClick');
    this.$rootScope.$emit('layerClick', layer);
  }
  emitBoundaryOver(feature, event) {
console.log('map-page-app-controller emitBoundaryOver');
    this.$rootScope.$emit('boundaryOver', feature);
  }
  emitBoundaryOut(event) {
console.log('map-page-app-controller emitBoundaryOut');
    this.$rootScope.$emit('boundaryOut', event);
  }
  onSetBoundaries(boundaries) {
console.log('map-page-app-controller onSetBoundaries');
    console.log(boundaries);
    this.geojson = boundaries;
    angular.extend(this.$scope, {
      geojson: boundaries
    });
  }
  onSetLayers(layers) {
console.log('map-page-app-controller onSetLayers');
    this.markers = layers;
    angular.extend(this.$scope, {
      baltimore: baltimore,
      defaults: {
        tileLayer: tileChoice.tileLayer,
        tileLayerOptions: tileChoice.tileLayerOptions,
        zoomControl: false
      },
      markers: this.markers
    });
  }
  $onInit() {
console.log('map-page-app-controller onINIT()');
    this.$element.addClass('flex layout-column');
  }
  $routerOnActivate() {}
}

AppController.$inject = ["$scope", "$rootScope", "$element", "leafletData"];
