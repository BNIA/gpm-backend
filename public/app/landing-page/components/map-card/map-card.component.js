import './map-card.css!';
import template from './map-card.html!text';
import controller from './map-card.controller';

let bindings = {
  onClickButton: '&'
};

export default {
  template,
  controller,
  bindings
};
