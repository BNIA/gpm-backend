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
  selectBoundaryFilter(value) {
    value.on = !value.on;
    this.onSelectBoundaryFilter({value});
  }
  selectBoundaryFiltersMore(value, key) {
    this.onSelectBoundaryFiltersMore({value, key});
  }
  selectIndicator(value, key) {
    this.onSelectIndicator({value, key});
  }
  selectIndicatorMore(value, key) {
    this.onSelectIndicatorMore({value, key});
  }
}

OverlayController.$inject = ["$element"];
