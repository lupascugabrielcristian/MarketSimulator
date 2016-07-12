angular.module('app').controller('mapController', mapController);

function mapController($scope, drawingService, citiesManager, events, initialData, game, player) {
    $scope.showPlayerDetailsModal = false;
    $scope.showShipDetailsModal = false;
    $scope.showCitypDetailsModal = false;
    $scope.allCitiesPanelIsVisible = false;
    $scope.buyShipPanelIsVisible = false;

    var initialCities = null;
    var initialPlayer = null;

    if (!game.isLoaded()){
        // Use initialData when user did not choose a saved game
        initialCities = initialData.data.initialCities;
        initialPlayer = initialData.data.initialPlayer;
        citiesManager.setCities(initialCities);
        player.setPlayerData(initialPlayer);
    } else {
        initialCities = citiesManager.getCities;
    }



    drawingService.drawCities(initialCities);

    $scope.showPlayerDetails = function(){
        $scope.showPlayerDetailsModal = !$scope.showPlayerDetailsModal;
    };

    $scope.showAllCitiesPanel = function() {
        $scope.allCitiesPanelIsVisible = !$scope.allCitiesPanelIsVisible;
    };

    $scope.showBuyShipPanel = function(){
        $scope.buyShipPanelIsVisible = !$scope.buyShipPanelIsVisible;
    };

    $scope.$on(events.pointClicked, function(event, args){
        /* Aici args este punctul pe care s-a facut click */
        $scope.showCityDetailsModal = !$scope.showCityDetailsModal;
        $scope.$applyAsync();
        $scope.cityClicked = args;
    });

}