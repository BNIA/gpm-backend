import './overlay.css!';
import template from './overlay.html!text';
import controller from './overlay.controller';

let bindings = {
  boundaryFilters: '<',
  selectedIndicator: '<',
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
