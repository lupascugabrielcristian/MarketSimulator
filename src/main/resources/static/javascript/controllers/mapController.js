angular.module('app').controller('mapController', mapController);

function mapController($scope, generatorService, drawingService, dataCalls, citiesManager) {
    $scope.points = [];

    $scope.selectedPoints = 0;
    $scope.testAction = function() {

        getInitialCities();
    };

    function getInitialCities(){
        dataCalls.getInitialCities().then(function(result){
            var initialCities = result.data;
            drawingService.drawCities(initialCities);
        });
    }

    function doAction() {
        $scope.points = generatorService.generatePoints(40);
        drawingService.drawPoints($scope.points);
        drawingService.removeLines();
        drawingService.drawLines($scope.points);
    }
}