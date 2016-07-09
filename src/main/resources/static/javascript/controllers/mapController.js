angular.module('app').controller('mapController', mapController);

function mapController($scope, generatorService, drawingService, player,  dataCalls, citiesManager, initialData, events) {
    $scope.showPlayerDetailsModal = false;
    $scope.showShipDetailsModal = false;
    $scope.showCitypDetailsModal = false;

    var resolveData = initialData.data;

    $scope.playerName = resolveData.initialPlayer.name;
    player.setPlayerData(resolveData.initialPlayer);
    var initialCities = resolveData.initialCities;

    $scope.testAction = function() {
        drawingService.drawCities(initialCities);
    };

    $scope.showPlayerDetails = function(){
        $scope.showPlayerDetailsModal = !$scope.showPlayerDetailsModal;
    };

    $scope.$on(events.pointClicked, function(event, args){
        /* Aici args este punctul pe care s-a facut click */
        $scope.showCityDetailsModal = !$scope.showCityDetailsModal;
        $scope.$applyAsync();
        $scope.cityClicked = args;
    });

}