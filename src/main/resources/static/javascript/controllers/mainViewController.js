angular.module('app').controller('mainViewController', mainViewController);

function mainViewController($scope, game, $timeout) {
	$scope.saveResult = false;
	$scope.saveGame = function(){
		var result = game.saveGame();
		result.then(function(result){
			$scope.saveResult = result.data;

			$timeout(function(){
				$scope.saveResult = false;
			}, 1000);
		});
	}
}