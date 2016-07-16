angular.module('app').controller('cargoOperationsController', cargoOperationsController);

function cargoOperationsController($scope, $stateParams, shipsManager, citiesManager, ngAudio) {
    $scope.ship = shipsManager.getShipById($stateParams.shipId);
    $scope.city = citiesManager.getCityById($stateParams.cityId);
}