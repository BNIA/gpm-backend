import angular from 'angular';
import './map-page.globals';

import AppComponent from './components/app/app.component';
import MapResizeDirective from './directives/resize-map/resize-map.directive';

let dependencies = ['ngMaterial', 'ui-leaflet'];
let mapPage = angular.module('mapPage', dependencies);

mapPage.component('mapPage', AppComponent);
mapPage.directive('resizeMap', MapResizeDirective.factory());

export default mapPage;
