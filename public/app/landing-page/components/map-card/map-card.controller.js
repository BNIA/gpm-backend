export default class MapCardController {
  constructor() {
    this.imgPath = 'app/assets/img/map.jpg';
    this.title = 'Green Pattern Map';
    this.buttonTitle1 = 'Access Map';
    this.buttonTitle2 = 'Preconfigured Views';
  }
  clickButton(options) {
    this.onClickButton(options);
  }
}

MapCardController.$inject = [];
