export default class AppController {
  constructor($scope, $rootScope, $route, $location, $mdSidenav, $mdMedia,
    FileSaver, Blob, cloudinary, layerFilterOptionsService, layersService,
    boundaryFilterOptionsService, vitalSignsService, geocoderService) {
    this.$scope = $scope;
    this.$rootScope = $rootScope; // The Root Scope of the app
    this.$route = $route;
    this.$location = $location;
    this.$mdSidenav = $mdSidenav;
    this.$mdMedia = $mdMedia;
    this.FileSaver = FileSaver;
    this.Blob = Blob;
    this.cloudinary = cloudinary;
    this.layerFilterOptionsService = layerFilterOptionsService;
    this.layersService = layersService;
    this.boundaryFilterOptionsService = boundaryFilterOptionsService;
    this.vitalSignsService = vitalSignsService;
    this.geocoderService = geocoderService;

    this.disqusConfig = {
      disqus_shortname: 'greenpatternmap',
      disqus_identifier: '2583577',
      disqus_url: 'https://greenpatternmap.disqus.com/default'
    };

    this.disqusUrlBase = 'https://greenpatternmap.disqus.com/layers/';

    // Assign local variables
    this.title = 'Green Pattern Map';
    this.layers = null;
    this.layerFilters = null;
    this.boundaryFilters = null;
    this.vitalSignsSections = null;
    this.selectedKey = null;
    this.selectedVal = null;
    this.selectedIndicator = null;
    this.path = null;

    // Assign to scope for children to access
    this.$rootScope.title = this.title;
    this.$rootScope.$on('layerClick', (event, layer) => {
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
  selectCollection(value, key) {
    console.log('collection selected');
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
  selectBoundaryFilter(value) {
    this.boundaryFilterOptionsService.getBoundaries(this.boundaryFilters)
      .then(boundaries => {
        this.setBoundaries(boundaries);
      });
  }
  selectBoundaryFilterOption(value) {
    this.boundaryFilterOptionsService.getBoundaries(this.boundaryFilters)
    .then(boundaries => {
      this.setBoundaries(boundaries);
    });
  }
  selectBoundaryFiltersMore(value, key) {
    this.selectedKey = key;
    this.selectedVal = value;
    this.toggleSidenav('right', true);
  }
  selectIndicatorMore(value, key) {
    this.selectedKey = key;
    this.selectedVal = value;
    this.toggleSidenav('right', true);
  }
  selectFilter(opt) {
    if (opt.type === 'layer-filter-option') {
      this.layersService.getLayers(this.layerFilters)
        .then(layers => {
          this.setLayers(layers);
        });
    }
  }
  selectVitalSignsIndicator(value) {
    this.vitalSignsService.getBoundary(value)
      .then(boundaries => {
        this.setVitalSignsBoundary(boundaries, value);
      });
  }
  setLayers(layers) {
    this.layers = layers;
    this.$rootScope.$broadcast('setLayers', layers);
  }
  setVitalSignsBoundary(boundaries, indicator) {
    this.selectedVitalSignsBoundary = boundaries;
    this.selectedIndicator = indicator;
    this.boundaries = boundaries;
    this.$rootScope.$broadcast('setBoundaries', boundaries);
  }
  setBoundaries(boundaries) {
    this.boundaries = boundaries;
    this.$rootScope.$broadcast('setBoundaries', boundaries);
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
  searchAddress(address) {
    return this.geocoderService.geocode(address).then(data => data);
  }
  $onInit() {
    this.layerFilterOptionsService.getLayerFilters().then(data => {
      this.layerFilters = data;
    }).then(() => {
      return this.boundaryFilterOptionsService.getBoundaryFilters();
    }).then(data => {
      this.boundaryFilters = data;
    }).then(() => {
      return this.vitalSignsService.getSections();
    }).then(data => {
      this.vitalSignsSections = data;
    }).then(() => {
      return this.geocoderService.geocode('2712 Guilford Avenue Baltimore, MD');
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
  'cloudinary',
  'layerFilterOptionsService',
  'layersService',
  'boundaryFilterOptionsService',
  'vitalSignsService',
  'geocoderService'
];
