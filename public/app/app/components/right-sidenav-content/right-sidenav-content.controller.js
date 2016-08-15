import angular from 'angular';
import template from './dialog.html!text';
import DialogController from './dialog.controller';
import kebabCase from 'lodash';

var DialogControllerFactory = function() {
  return new DialogController();
};

export default class RightSidenavContentController {
  constructor($element, $mdMedia, $mdDialog) {
    this.$element = $element;
    this.$mdMedia = $mdMedia;
    this.$mdDialog = $mdDialog;
  }
  $onInit() {
    this.$element.addClass('flex layout-column');
  }
  getTitleBarClass(value) {
    var title = 'md-accent ';
    title += 'my-';
    title += kebabCase(value);
    title += '-toolbar';
  }
  select(item) {
    if (item.class === 'Layer Filter Option') {
      this.onSelectLayerFilterOption({item});
    }
  }
  showVitalSignsIndicatorInfo(item, ev) {
    return this.showDialog({
      title: item.Name,
      description: item.Description,
      source: item['Source Name']
    }, ev);
  }
  showDialog(locals, ev) {
    // var ele = this.$element;
    var dia = this.$mdDialog;
    dia.show({
      controller: DialogController,
      controllerAs: '$ctrl',
      bindToController: true,
      templateUrl: 'app/app/components/right-sidenav-content/dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: locals,
      clickOutsideToClose: true
    });
  }
  selectBoundaryFilter(value) {
    this.onSelectBoundaryFilter({value});
  }
  selectBoundaryFilterOption(value) {
    value.on = !value.on;
    this.onSelectBoundaryFilterOption({value});
  }
  selectVitalSignsIndicator(value, toggle) {
    if (toggle === true) {
      value.on = !value.on;
      console.log(this.vitalSignsSections.selected);
      this.vitalSignsSections.selected = value.Name;
    }
    this.onSelectVitalSignsIndicator({value});
  }
  navBack() {
    this.onNavBack();
  }
}

RightSidenavContentController.$inject = [
  "$element", "$mdMedia", "$mdDialog"
];
