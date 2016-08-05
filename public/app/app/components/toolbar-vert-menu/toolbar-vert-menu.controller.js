export default class ToolbarVertMenuController {
  constructor(){}
  selectLayersDownload(fileType) {
    console.log("trying");
    this.onSelectLayersDownload({fileType});
  }
  openMenu($mdOpenMenu, ev) {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }
}

ToolbarVertMenuController.$inject = [];
