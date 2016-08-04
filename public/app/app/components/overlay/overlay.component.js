import './overlay.css!';
import template from './overlay.html!text';
import controller from './overlay.controller';

let bindings = {
  boundaryChoices: '<',
  onBoundaryChoicesChange: '&',
  onBoundaryChoicesMore: '&'
};

export default {
  template,
  controller,
  bindings
};
