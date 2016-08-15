export default class ToolbarVertMenuController {
  selectLayersDownload(fileType) {
    this.onSelectLayersDownload({fileType});
  }
  openMenu($mdOpenMenu, ev) {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }
}

ToolbarVertMenuController.$inject = [];
