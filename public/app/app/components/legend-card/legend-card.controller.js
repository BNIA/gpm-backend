export default class LegendCardController {
  constructor($element, $mdMedia) {
    this.$element = $element;
    this.$mdMedia = $mdMedia;
  }
  $onInit() {
    this.$element.css('flex-basis', 'fill');
  }
}

LegendCardController.$inject = ["$element", "$mdMedia"];
