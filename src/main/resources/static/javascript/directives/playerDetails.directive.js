angular.module('app').directive('playerDetails', playerDetails);
function playerDetails(player) {
    return {
        restrict: 'AE',
        templateUrl: '/parts/playerDetails.html',
        link: function($scope) {
            $scope.playerName = player.getPlayerName();
            $scope.playerMoney = player.getPlayerMoney();
        },
        controller : function($scope) {
            $scope.playerName = player.getPlayerName();
            $scope.playerMoney = player.getPlayerMoney();
        }
    }
}