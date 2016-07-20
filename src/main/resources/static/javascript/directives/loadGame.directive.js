angular.module('app').directive('loadGames', loadGames);

function loadGames(dataCalls, $state) {
    return {
        restrict: 'AE',
        templateUrl: "/parts/loadGames.html",
        scope: {
          loadFc :"="
        },
        link: function($scope) {
            var allGamesPromise = dataCalls.loadAllGames();
            allGamesPromise.then(function(result){
                $scope.games = result.data;
            });
        },
        controller: function ($scope) {
            $scope.selectedGame = null;
            $scope.selectGame = function(game) {
                $scope.selectedGame = game;
            };

            $scope.loadSelectedGame = function(){
                $scope.loadFc($scope.selectedGame.id);
            }
        }
    }
}
