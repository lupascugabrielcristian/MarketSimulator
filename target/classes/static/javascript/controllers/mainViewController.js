angular.module('app').controller('mainViewController', mainViewController);

function mainViewController($scope, game, $timeout, $state, dataCalls, citiesManager, shipsManager, player) {
	$scope.saveResult = false;
	$scope.loadModalIsVisible = false;

	$scope.newGame = function() {
		createNewGame();
		$state.go('map');
	};

	$scope.saveGame = function(){
		var result = game.saveGame();
		result.then(function(result){
			$scope.saveResult = result.data;

			$timeout(function(){
				$scope.saveResult = false;
			}, 1000);
		});
	};

	$scope.loadGame = function() {
		$scope.loadModalIsVisible = !$scope.loadModalIsVisible;
	};

	$scope.loadGameWithId = function(gameId){
		var gamePromise = dataCalls.loadOneGame(gameId);
		gamePromise.then(function(result) {
				var gameSituation = result.data;
				game.loadGame(gameSituation);
				$state.go('map');
		});
	};

	function createNewGame() {
		dataCalls.initialize().then(function(result){
			var initialCities = result.data.initialCities;
			var initialPlayer = result.data.initialPlayer;
			var initialShips = initialPlayer.ships;
			citiesManager.setCities(initialCities);
			shipsManager.setShipsData(initialShips);
			player.setPlayerData(initialPlayer);
		});
	}


}
