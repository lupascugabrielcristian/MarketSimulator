angular.module('app').directive('buyShip', buyShip);

function buyShip(player, dataCalls){
    return {
        restrict: 'AE',
        templateUrl: '/parts/buyShip.html',
        link: function($scope) {
            dataCalls.getAvailableShips().then(function(result){
                $scope.availableShips = result.data;
            });
        },
        controller: function($scope){
            $scope.ships = player.getPlayerShips();
        }
    }
}