angular.module('app').controller('mapController', mapController);

function mapController($scope, generatorService, drawingService) {
    $scope.points = [];

    $scope.selectedPoints = 0;
    $scope.testAction = function() {
        drawingService.removeMessage();
        $scope.gameInterval = setInterval(doAction, 1000);

        setTimeout(function(){
            clearInterval($scope.gameInterval);
            drawingService.removePoints();
            drawingService.removeLines();
            drawingService.drawMessage("Game Over. " + $scope.selectedPoints + " Points", 490, 350);
        }, 50000);
    };

    function doAction() {
        $scope.points = generatorService.generatePoints(40);
        drawingService.drawPoints($scope.points);
        drawingService.removeLines();
        drawingService.drawLines($scope.points);
    }
}