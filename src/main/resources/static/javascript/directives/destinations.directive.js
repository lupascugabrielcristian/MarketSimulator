angular.module('app').directive('destinations', destinations);
function destinations(citiesManager, shipsManager, $rootScope, events){
    return {
        restrict: 'AE',
        templateUrl: '/parts/destinations.html',
        link: function() {

        },
        controller: function($scope) {
            $scope.test = "Test OK";
            $scope.cities = citiesManager.getCities();
            $scope.selectedCity = null;

            $scope.selectCity = function(city) {
                $scope.selectedCity = city;
            };

            $scope.setDestination = function() {
                if ($scope.selectedCity){
                    var ship = shipsManager.getShipByName($scope.selectedShip.name);
                    ship.destinationCity = $scope.selectedCity;
                }

                $rootScope.$broadcast(events.modal, {
                    modal: "Destinations",
                    closeOthers: false
                });
            };
        }
    }
}