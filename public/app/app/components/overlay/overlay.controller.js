export default class OverlayController {
  constructor($element) {
    this.$element = $element;
    this.originatorEv = null;
  }
  $onInit() {
    this.$element.css('flex-basis', 'fill');
  }
  openMenu($mdOpenMenu, ev) {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }
  boundaryChoicesChange(opt) {
    this.onBoundaryChoicesChange({opt});
  }
  boundaryChoicesMore(opt) {
    this.onBoundaryChoicesMore({opt});
  }
}

OverlayController.$inject = ["$element"];
