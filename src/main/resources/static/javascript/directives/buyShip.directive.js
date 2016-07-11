angular.module('app').directive('buyShip', buyShip);

function buyShip(player){
    return {
        restrict: 'AE',
        templateUrl: '/parts/buyShip.html',
        link: function() {

        },
        controller: function($scope){
            $scope.ships = player.getPlayerShips();
        }
    }
}