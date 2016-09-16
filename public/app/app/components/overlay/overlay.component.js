import './overlay.css!';
import template from './overlay.html!text';
import controller from './overlay.controller';

let bindings = {
  boundaryFilters: '<',
  selectedIndicator: '<',
  selectedAddress: '<',
  onSelectBoundaryFilter: '&',
  onSelectBoundaryFiltersMore: '&',
  onSelectIndicator: '&',
  onSelectIndicatorMore: '&'
};

export default {
  template,
  controller,
  bindings
};
