import './landing-page.globals';
import angular from 'angular';

// Import Configuration
import mdThemeConfig from '../shared/md-theme-config';
import mdIconConfig from '../shared/md-icon-config';

// Import components
import AppComponent from './components/app/app.component';
import MapCardComponent from './components/map-card/map-card.component';
import GpbCardComponent from './components/gpb-card/gpb-card.component';
import PhasesCardComponent from
  './components/phases-card/phases-card.component';
import DescCardComponent from './components/desc-card/desc-card.component';
import FooterComponent from './components/footer/footer.component';

// Initialize the app
var dependencies = ['ngMaterial'];
let landingPage = angular.module('landingPage', dependencies);

// Configure the app
landingPage.config(mdThemeConfig);
landingPage.config(mdIconConfig);

// Load components into the app
landingPage.component('landingPage', AppComponent);
landingPage.component('mapCard', MapCardComponent);
landingPage.component('gpbCard', GpbCardComponent);
landingPage.component('phasesCard', PhasesCardComponent);
landingPage.component('descCard', DescCardComponent);
landingPage.component('footer', FooterComponent);

export default landingPage;
