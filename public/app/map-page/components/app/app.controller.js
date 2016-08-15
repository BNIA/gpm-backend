import angular from 'angular';
// switch out tile-layers here
import {baltimore, cartodbPositron as tileChoice} from './parameters.js';

export default class AppController {
  constructor($scope, $rootScope, $element) {
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
      this.onSetLayers(layers);
    });
    this.$rootScope.$on('setBoundaries', (event, boundaries) => {
      this.onSetBoundaries(boundaries);
    });
    this.$scope.$on('leafletDirectiveMarker.click', (event, marker) => {
      this.emitLayerClick(marker.model.properties || {});
    });
  }
  emitLayerClick(layer) {
    this.$rootScope.$emit('layerClick', layer);
  }
  onSetBoundaries(boundaries) {
    console.log(boundaries);
    this.geojson = boundaries;
    angular.extend(this.$scope, {
      geojson: boundaries
    });
  }
  onSetLayers(layers) {
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
    this.$element.addClass('flex layout-column');
  }
  $routerOnActivate() {}
}

AppController.$inject = ["$scope", "$rootScope", "$element", "leafletData"];
