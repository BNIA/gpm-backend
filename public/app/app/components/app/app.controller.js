export default class AppController {
  constructor($scope, $rootScope, $route, $location, $mdSidenav, $mdMedia,
    layerFilterOptionsService) {
    this.$scope = $scope;
    this.$rootScope = $rootScope; // The Root Scope of the app
    this.$route = $route;
    this.$location = $location;
    this.$mdSidenav = $mdSidenav;
    this.$mdMedia = $mdMedia;
    // this.optionsService = optionsService;
    // this.layersService = layersService;
    this.layerFilterOptionsService = layerFilterOptionsService;
    this.test = [
      {src: 'http://orig12.deviantart.net/8670/f/2016/152/b/6/placeholder_1_by_sketchymouse-da4nvhb.png'},
      {src: "http://orig12.deviantart.net/8670/f/2016/152/b/6/placeholder_1_by_sketchymouse-da4nvhb.png"},
      {src: "http://orig12.deviantart.net/8670/f/2016/152/b/6/placeholder_1_by_sketchymouse-da4nvhb.png"},
      {src: "../../../assets/img/map.jpg"}
    ];
    this.disqusConfig = {
      disqus_shortname: 'greenpatternmap',
      disqus_identifier: '2583577',
      disqus_url: 'https://greenpatternmap.disqus.com/default'
    };

    this.disqusUrlBase = 'https://greenpatternmap.disqus.com/layers/';

    // Assign local variables
    this.title = 'Green Pattern Map';
    this.layerFilters = null;
    this.layerFilters = null;
    this.boundaryChoices = null;
    this.vitalSigns = null;
    this.selectedKey = null;
    this.selectedVal = null;
    // this.selected = null;
    this.path = null;

    // Assign to scope for children to access
    this.$rootScope.title = this.title;
    this.$rootScope.$on('layerClick', (event, layer) => {
      layer.type = 'layer';
      this.selectItem(layer);
    });
  }
  reroute(route) {
    this.$location.path(route);
    this.path = this.$location.path();
    console.log(this.path);
  }
  toggleSidenav(side, onOff) {
    console.log(side, onOff);
    if (onOff === true) {
      this.$mdSidenav(side).open();
    } else if (onOff === false) {
      this.$mdSidenav(side).close();
    } else {
      this.$mdSidenav(side).toggle();
    }
  }
  selectLayerFilter(value, key) {
    // if (item.type === 'layer') {
    //   console.log(item);
    //   this.disqusConfig.disqus_url = this.disqusUrlBase +
    //     item.properties.site_id;
    //   this.disqusConfig.disqus_identifier = item.properties.site_id;
    // }
    console.log(value);
    console.log(key);
    this.selectedKey = key;
    this.selectedVal = value;
    this.toggleSidenav('right', true);
  }
  selectLayerFilterOption(item) {
    this.layerFilterOptionsService.getLayers(this.layerFilters);
  }
  selectFilter(opt) {
    if (opt.type === 'layer-filter-option') {
      this.layersService.getLayers(this.layerFilters)
        .then(layers => {
          this.setLayers(layers);
        });
    }
    // console.log(opt);
  }
  setLayers(layers) {
    this.$rootScope.$broadcast('setLayers', layers);
  }
  $onInit() {
    this.layerFilterOptionsService.getLayerFilters().then(data => {
      this.layerFilters = data;
    });
    // this.optionsService.getLayerFilters().then(data => {
    //   this.layerFilters = data;
    // });
    // this.optionsService.getBoundaryChoices().then(data => {
    //   this.boundaryChoices = data;
    //   let csas = this.boundaryChoices.findBoundaryChoice('csas');
    //   let vitalSigns = csas.filterConfig('vital_signs');
    //   this.vitalSigns = vitalSigns;
    // });
    this.path = this.$location.path();
  }
}

AppController.$inject = [
  '$scope',
  '$rootScope',
  '$route',
  '$location',
  '$mdSidenav',
  '$mdMedia',
  'layerFilterOptionsService'
];
