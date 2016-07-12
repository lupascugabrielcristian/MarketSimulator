angular.module('app').directive('buyShip', buyShip);

function buyShip(player, dataCalls, events){
    return {
        restrict: 'AE',
        templateUrl: '/parts/buyShip.html',
        link: function($scope) {
            dataCalls.getAvailableShips().then(function(result){
                $scope.availableShips = result.data;
            });
        },
        controller: function($scope){
            $scope.money = player.getPlayerMoney();
            $scope.selectedShip = null;
            $scope.ships = player.getPlayerShips();

            $scope.selectShip = function(ship) {
                $scope.selectedShip = ship;
            };

            $scope.buySelectedShip = function() {
                player.buyShip($scope.selectedShip);
            };

            $scope.$on(events.shipBought, function(event, args){
                $scope.ships = args.playerShips;
                $scope.money = args.playerMoney;
            });
        }
    }
}