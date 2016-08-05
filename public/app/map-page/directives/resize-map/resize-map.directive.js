import controller from './resize-map.controller.js';

export default class ResizeMapDirective {
  constructor() {
    this.restrict = 'A';
    this.controller = controller;
  }
}

ResizeMapDirective.factory = function() {
  return function() {
    return new ResizeMapDirective();
  };
};
