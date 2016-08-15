import './right-sidenav-content.css!';
import controller from './right-sidenav-content.controller';
import template from './right-sidenav-content.html!text';

let bindings = {
  selectedKey: '<',
  selectedVal: '<',
  vitalSignsSections: '<',
  onSelectLayerFilterOption: '&',
  onSelectBoundaryFilter: '&',
  onSelectBoundaryFilterOption: '&',
  onSelectVitalSignsIndicator: '&',
  onNavBack: '&',
  disqusConfig: '<'
};

export default {
  controller,
  template,
  bindings
};
