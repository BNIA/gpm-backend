export default class LeftSidenavContentController {
  constructor($rootScope, $element, $mdMedia) {
    this.$element = $element;
    this.$mdMedia = $mdMedia;
    this.title = $rootScope.title;
    this.selectedKey = null;
    this.selectedVal = null;
  }
  selectItem(value, key) {
    this.selectedKey = key;
    this.selectedVal = value;
    this.onSelect({value, key});
  }
  navBack() {
    this.onNavBack({});
  }
  $onInit() {
    this.$element.addClass('flex layout-column');
  }
}

LeftSidenavContentController.$inject = ['$rootScope', '$element', '$mdMedia'];
