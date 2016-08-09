export default class CarouselController {
  constructor($element) {
    this.$element = $element;

    this.test = [
      {src: 'http://orig12.deviantart.net/8670/f/2016/152/b/6/placeholder_1_by_sketchymouse-da4nvhb.png'},
      {src: "http://orig12.deviantart.net/8670/f/2016/152/b/6/placeholder_1_by_sketchymouse-da4nvhb.png"},
      {src: "http://orig12.deviantart.net/8670/f/2016/152/b/6/placeholder_1_by_sketchymouse-da4nvhb.png"},
      {src: "../../../assets/img/map.jpg"}
    ];
    this.images = [
      {public_id: 'CG_0681_g01bvo'},
      {public_id: 'CG_0681_g01bvo'},
      {public_id: 'CG_0681_g01bvo'}
    ];
  }
  $onInit() {
    // this.$element.css('flex-basis', 'fill');
  }
}

CarouselController.$inject = ["$element"];
