angular.module('app').controller('citiesViewController', citiesViewController);

function citiesViewController($scope, citiesManager) {
    $scope.detailsVisible = false;
    $scope.factoriesVisible = false;
    $scope.commoditiesVisible = false;

    $scope.allCities = citiesManager.getCities();
}