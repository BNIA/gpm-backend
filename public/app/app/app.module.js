import angular from 'angular';
import './app.globals';

// Import Configuration
import {routeProviderConfig, angularCloudinaryConfig, clickFixConfig}
  from './app.config';
import mdThemeConfig from '../shared/md-theme-config';
import mdIconConfig from '../shared/md-icon-config';

// Import Components
import AppComponent from './components/app/app.component';
import LeftSidenavContentComponent from
  './components/left-sidenav-content/left-sidenav-content.component';
import RightSidenavContentComponent from
  './components/right-sidenav-content/right-sidenav-content.component';
import OverlayComponent from
  './components/overlay/overlay.component';
import ToolbarVertMenuComponent from
  './components/toolbar-vert-menu/toolbar-vert-menu.component';
import CarouselComponent from
  './components/carousel/carousel.component';
import LegendCardComponent from
  './components/legend-card/legend-card.component';

// Import services
import LayerFilterOptionsService from
  './services/layer-filter-options.service.js';
import LayersService from
  './services/layers.service.js';
import BoundaryFilterOptionsService from
  './services/boundary-filter-options.service.js';
import VitalSignsService from
  './services/vital-signs.service.js';
import GeocoderService from
  './services/geocoder.service';
import CircleService from
  './services/circle.service';

var dependencies = [
  'ngMaterial',
  'ngRoute',
  'landingPage',
  'mapPage',
  'angularUtils.directives.dirDisqus',
  'jkAngularCarousel',
  'ngFileSaver',
  'angular-cloudinary'
];

let app = angular.module('app', dependencies);

// Configure app
app.config(routeProviderConfig);
app.config(mdThemeConfig);
app.config(mdIconConfig);
app.config(angularCloudinaryConfig);
app.config(clickFixConfig);

// Load components into the app
app.component('app', AppComponent);
app.component('leftSidenavContent', LeftSidenavContentComponent);
app.component('rightSidenavContent', RightSidenavContentComponent);
app.component('overlay', OverlayComponent);
app.component('toolbarVertMenu', ToolbarVertMenuComponent);
app.component('carousel', CarouselComponent);
app.component('legendCard', LegendCardComponent);

// Load services into the app
app.service('layerFilterOptionsService', LayerFilterOptionsService);
app.service('layersService', LayersService);
app.service('boundaryFilterOptionsService', BoundaryFilterOptionsService);
app.service('vitalSignsService', VitalSignsService);
app.service('geocoderService', GeocoderService);
app.service('circleService', CircleService);

// Bootstrap the app
angular.element(document).ready(() => {
  document.body.setAttribute('layout', 'column');
  let appEle = document.getElementsByTagName('app')[0];
  appEle.setAttribute('layout', 'column');
  appEle.setAttribute('flex', 100);
  angular.bootstrap(document.body, ['app'], {
    strictDi: true
  });
  // Add flex to the component here if needed , etc.
});

export default app;
