angular.module('app').controller('mapController', mapController);

function mapController($scope, generatorService, drawingService, dataCalls, citiesManager, initialData) {

    var resolveData = initialData.data;

    $scope.playerName = resolveData.initialPlayer.name;
    var initialCities = resolveData.initialCities;

    $scope.testAction = function() {
        drawingService.drawCities(initialCities);
    };


}