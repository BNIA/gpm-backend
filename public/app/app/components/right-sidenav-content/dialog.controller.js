export default class DialogController {
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }
  hide() {
    this.$mdDialog.hide();
  }
  cancel() {
    this.$mdDialog.cancel();
  }
  answer(answer) {
    this.$mdDialog.hide(answer);
  }
}

DialogController.$inject = ['$mdDialog'];
