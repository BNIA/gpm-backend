export default class RightSidenavContentController {
  constructor($element, $mdMedia) {
    this.$element = $element;
    this.$mdMedia = $mdMedia;
  }
  $onInit() {
    this.$element.addClass('flex layout-column');
  }
  select(item) {
    // if (this.selected.type === 'boundary-choice-config') {
    //   opt.toggleIsOn();
    // }
    if (item.class === 'Layer Filter Option') {
      this.onSelectLayerFilterOption({item});
    }
  }
  navBack() {
    console.log("hi");
    this.onNavBack();
  }
}

RightSidenavContentController.$inject = ["$element", "$mdMedia"];
