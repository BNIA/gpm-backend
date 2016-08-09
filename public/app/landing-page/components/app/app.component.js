import './app.css!';
import controller from './app.controller';
import template from './app.html!text';

var bindings = {
  onMapAccess: '&'
};

export default {
  controller,
  template,
  bindings
};
