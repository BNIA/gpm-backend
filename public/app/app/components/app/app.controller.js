export default class AppController {
  constructor($scope, $rootScope, $route, $location, $mdSidenav, $mdMedia,
    FileSaver, Blob, layerFilterOptionsService, layersService) {
    var self = this;
    this.$scope = $scope;
    this.$rootScope = $rootScope; // The Root Scope of the app
    this.$route = $route;
    this.$location = $location;
    this.$mdSidenav = $mdSidenav;
    this.$mdMedia = $mdMedia;
    this.FileSaver = FileSaver;
    this.Blob = Blob;
    // this.optionsService = optionsService;
    // this.layersService = layersService;
    this.layerFilterOptionsService = layerFilterOptionsService;
    this.layersService = layersService;
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

    this.vertMenuItems = [
      {title: 'Download Layers', items: [
        {title: '... as CSV', icon: 'file_download', action: function() {
          self.downloadLayers('csv');
        }},
        {title: '... as JSON', icon: 'file_download', action: function() {
          self.downloadLayers('json');
        }},
        {title: '... as GeoJSON', icon: 'file_download', action: function() {
          self.downloadLayers('geojson');
        }}
      ]},
      {title: 'Download Boundary', items: [
        {title: '... as GeoJSON', icon: 'file_download', action: null}
      ]}
    ];
    // Assign local variables
    this.title = 'Green Pattern Map';
    this.layers = null;
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
      console.log(layer);
      this.layersService.getLayerDetail(layer).then(layerDetail => {
        this.selectLayerDetail(layerDetail);
      });
    });
  }
  reroute(route) {
    this.$location.path(route);
    this.path = this.$location.path();
  }
  toggleSidenav(side, onOff) {
    if (onOff === true) {
      this.$mdSidenav(side).open();
    } else if (onOff === false) {
      this.$mdSidenav(side).close();
    } else {
      this.$mdSidenav(side).toggle();
    }
  }
  selectLayerDetail(obj) {
    this.disqusConfig.disqus_url = this.disqusUrlBase +
    obj['Layer Detail Type'] + obj['Site Id'];
    this.disqusConfig.disqus_identifier =
    obj['Layer Detail Type'] + obj['Site Id'];
    this.selectedKey = obj['Layer Detail Name'] ||
    obj['Layer Detail Address'] ||
    obj['Layer Detail Type'] + " " + obj['Site Id'];
    this.selectedVal = obj;
    this.toggleSidenav('right', true);
  }
  selectLayerFilter(value, key) {
    this.selectedKey = key;
    this.selectedVal = value;
    this.toggleSidenav('right', true);
  }
  selectLayerFilterOption(item) {
    this.layerFilterOptionsService.getLayers(this.layerFilters)
      .then(layers => {
        this.setLayers(layers);
      });
  }
  selectFilter(opt) {
    if (opt.type === 'layer-filter-option') {
      this.layersService.getLayers(this.layerFilters)
        .then(layers => {
          this.setLayers(layers);
        });
    }
  }
  setLayers(layers) {
    this.layers = layers;
    this.$rootScope.$broadcast('setLayers', layers);
  }
  openVertMenu($mdOpenMenu, ev) {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }
  layersDownload(fileType) {
    var mimeType;
    if (fileType === 'csv') {
      mimeType = 'text/csv;charset-utf-8';
    } else if (fileType === 'json') {
      mimeType = 'application/json;charset-utf-8;';
    } else if (fileType === 'geojson') {
      mimeType = 'application/vnd.geo+json;charset-utf-8';
    }

    if (mimeType) {
      this.layersService.getDownload(this.layers, fileType).then(dl => {
        if (fileType === 'json' || fileType === 'geojson') {
          dl = JSON.stringify(dl);
        }
        var data = new this.Blob([dl], {type: mimeType});
        this.FileSaver.saveAs(data, 'gpm_layers.' + fileType);
      });
    }
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
  'FileSaver',
  'Blob',
  'layerFilterOptionsService',
  'layersService'
];
