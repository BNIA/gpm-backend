import './legend-card.css!';
import template from './legend-card.html!text';
import controller from './legend-card.controller';

let bindings = {
  selectedIndicator: '<',
  selectedAddress: '<'
};

export default {
  template,
  controller,
  bindings
};
