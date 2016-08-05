import angular from 'angular';

export default class ResizeMapController {
  constructor($scope, $timeout, $element, leafletData) {
    angular.extend($scope, {
      events: {
        map: {
          enable: ['load'],
          logic: 'emit'
        }
      }
    });

    $scope.mapLoaded = false;
    $scope.$on('leafletDirectiveMap.load', () => {
      $scope.mapLoaded = true;
    });
    $scope.watchFunc = function() {
      return $scope.mapLoaded + $element[0].parentElement.offsetHeight;
    };
    $scope.resetMap = function() {
      if ($scope.mapLoaded) {
        var newHeight = $element[0].parentElement.offsetHeight;
        if (newHeight !== 0) {
          var mapElement = angular.element(
            $element[0].parentElement.querySelector('.angular-leaflet-map')
          )[0];
          mapElement.style.height = newHeight;
          leafletData.getMap()
            .then(map => {
              $timeout(() => {
                map.invalidateSize();
              });
            });
        }
      }
    };
    $scope.$watch($scope.watchFunc, $scope.resetMap);
  }
}

ResizeMapController.$inject = ["$scope", "$timeout", "$element", "leafletData"];
