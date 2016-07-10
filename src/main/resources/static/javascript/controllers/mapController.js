angular.module('app').controller('mapController', mapController);

function mapController($scope, generatorService, drawingService, player,  dataCalls, citiesManager, events, game) {
    $scope.showPlayerDetailsModal = false;
    $scope.showShipDetailsModal = false;
    $scope.showCitypDetailsModal = false;
    $scope.allCitiesPanelIsVisible = false;


    var initialCities = citiesManager.getCities;
    drawingService.drawCities(initialCities);

    $scope.showPlayerDetails = function(){
        $scope.showPlayerDetailsModal = !$scope.showPlayerDetailsModal;
    };

    $scope.showAllCitiesPanel = function() {
        $scope.allCitiesPanelIsVisible = !$scope.allCitiesPanelIsVisible;
    };

    $scope.$on(events.pointClicked, function(event, args){
        /* Aici args este punctul pe care s-a facut click */
        $scope.showCityDetailsModal = !$scope.showCityDetailsModal;
        $scope.$applyAsync();
        $scope.cityClicked = args;
    });

}