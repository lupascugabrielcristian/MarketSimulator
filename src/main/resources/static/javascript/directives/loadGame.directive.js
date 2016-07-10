angular.module('app').directive('loadGames', loadGames);

function loadGames(dataCalls, game, $state) {
    return {
        restrict: 'AE',
        templateUrl: "/parts/loadGames.html",
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
                var gamePromise = dataCalls.loadOneGame($scope.selectedGame.id);
                gamePromise.then(function(result) {
                    var gameSituation = result.data;
                    game.loadGame(gameSituation);
                    $state.go('map');
                });
            }
        }
    }
}