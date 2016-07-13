angular.module('app').directive('allShips', allShips);

function allShips(player) {
    return {
        restrict: 'AE',
        templateUrl: '/parts/allShips.html',
        link: function($scope) {
            $scope.ships = player.getPlayerShips();
        },
        controller: function($scope){
            $scope.selectedShip = null;

            $scope.getDetails = function(ship) {
                $scope.selectedShip = ship;
            };
        }
    };
}