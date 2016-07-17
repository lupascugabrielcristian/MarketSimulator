angular.module('app').controller('cargoOperationsController', cargoOperationsController);

function cargoOperationsController($scope, $stateParams, shipsManager, citiesManager, ngAudio) {
    $scope.ship = shipsManager.getShipById($stateParams.shipId);
    $scope.city = citiesManager.getCityById($stateParams.cityId);
    $scope.valueOfselection = [];
    var selectedCityCommodities = [];
    var selectedShipsCommodities = [];

    $scope.checkCargo = function(a, b){
        console.log(a);
        console.log(b);
        console.log($scope.valueOfselection);
    }
}