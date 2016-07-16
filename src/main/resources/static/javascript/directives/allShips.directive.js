angular.module('app').directive('allShips', allShips);

function allShips(player, citiesManager, $rootScope, events, shipsManager, $state, ngAudio) {
    return {
        restrict: 'AE',
        templateUrl: '/parts/allShips.html',
        link: function($scope) {
            $scope.selectedShip = null;
            $scope.ships = player.getPlayerShips();
        },
        controller: function($scope){
            $scope.allCities = citiesManager.getCities();
            $scope.getShipDetails = function(ship) {
                ship = shipsManager.getShipByName(ship.name);
                $scope.selectedShip = ship;
            };

            $scope.showDestinationsModal = function(){
                $rootScope.$broadcast(events.modal, {
                    modal: "Destinations",
                    closeOthers: false,
                    ship: $scope.selectedShip
                });
            };

            $scope.gotoCargoOperations = function() {
                $state.go('CargoOperations', {
                    shipId: $scope.selectedShip.id,
                    cityId: $scope.selectedCity.id
                });
            };
        }
    };
}