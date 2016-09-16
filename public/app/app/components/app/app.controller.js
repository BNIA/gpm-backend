import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';

export default class AppController {
  constructor($scope, $rootScope, $route, $location, $mdSidenav, $mdMedia,
    FileSaver, Blob, cloudinary, layerFilterOptionsService, layersService,
    boundaryFilterOptionsService, vitalSignsService, geocoderService,
    circleService) {
    var self = this;
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
    this.circleService = circleService;

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
    this.boundaries = {
      data: {type: 'FeatureCollection', features: []},
      style: function(feature) {
        var fillColor = 'rgba(0,0,0,.5)';
        var color = 'black';

        return {
          fillColor: fillColor,
          weight: 2,
          opacity: 1,
          color: color,
          dashArray: '3',
          fillOpacity: 0.7
        };
      }
    };
    this.layerFiltersConfig = {};
    this.circleBoundaries = null;
    this.boundaryText = null;

    // Assign to scope for children to access
    this.$rootScope.title = this.title;
    this.$rootScope.$on('layerClick', (event, layer) => {
      this.layersService.getLayerDetail(layer).then(layerDetail => {
        this.selectLayerDetail(layerDetail);
      });
    });
    this.$rootScope.$on('boundaryOver', (event, feature) => {
      console.log(feature);
      if (feature.properties && feature.properties.Name) {
        self.boundaryText = feature.properties.Name;
      } else if (feature.properties && feature.properties.communityStatisticalArea) {
        self.boundaryText =
          feature.properties.communityStatisticalArea.boundary.name + ' - ' +
          feature.properties.value;
      } else if (feature.properties && feature.properties.is_circle === true) {
        self.boundaryText = self.selectedAddress.formatted_address;
      }
    });

    this.$rootScope.$on('boundaryOut', event => {
      console.log("out");
      self.boundaryText = null;
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
    console.log(obj);
    this.selectedVal = obj;
    this.toggleSidenav('right', true);
  }
  selectCollection(value, key) {
    this.selectedKey = key;
    this.selectedVal = value;
    this.toggleSidenav('right', true);
  }
  selectLayerFilterOption(item) {
    var opt = {};
    if (this.selectedAddress) {
      opt.radius = this.selectedAddress.geometry.location;
    }
    this.layerFilterOptionsService.getLayers(this.layerFilters,
      opt)
      .then(layers => {
        this.setLayers(layers);
      })
      .then(() => {
        var q;
        if (opt.radius) {
          q = this.circleService.getCircle(opt.radius).then(circle => {
            this.circleBoundaries = circle;
            return this.setBoundaries(this.boundaries);
          });
        } else {
          this.circleBoundaries = null;
          q = this.setBoundaries(this.boundaries);
        }
        return q;
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
        this.selectedIndicator = value;
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
    console.log(boundaries);
    var bds = cloneDeep(boundaries, true);
    if (this.circleBoundaries !== null && this.circleBoundaries !== undefined) {
      forEach(this.circleBoundaries.features, f => {
        bds.data.features.push(f);
      });
    }
    this.$rootScope.$broadcast('setBoundaries', bds);
  }
  setBoundaries(boundaries) {
    this.boundaries = boundaries;
    var bds = cloneDeep(boundaries, true);
    if (this.circleBoundaries !== null && this.circleBoundaries !== undefined) {
      forEach(this.circleBoundaries.features, f => {
        bds.data.features.push(f);
      });
    }
    this.$rootScope.$broadcast('setBoundaries', bds);
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
  selectAddress(address) {
    this.selectedAddress = address;
    this.selectLayerFilterOption({});
    // console.log(address);
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
  'geocoderService',
  'circleService'
];
