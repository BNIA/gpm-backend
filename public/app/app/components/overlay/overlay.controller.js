import BottomSheetController from './bottom-sheet.controller';
import angular from 'angular';

var BottomSheetFactory = function() {
  return new BottomSheetController();
};

export default class OverlayController {
  constructor($element, $mdMedia, $mdBottomSheet) {
    this.$element = $element;
    this.$mdMedia = $mdMedia;
    this.$mdBottomSheet = $mdBottomSheet;
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
  showBottomSheet() {
    var locals = {
      selectedIndicator: this.selectedIndicator,
      selectedAddress: this.selectedAddress
    };

    this.$mdBottomSheet.show({
      templateUrl:  'app/app/components/overlay/bottom-sheet.html',
      controller: BottomSheetController,
      controllerAs: '$ctrl',
      bindToController: true,
      locals: locals,
      parent: angular.element(document.body),
    });
  }
}

OverlayController.$inject = ["$element", "$mdMedia", "$mdBottomSheet"];
