angular.module('app').directive('allCities', allCities);
function allCities(citiesManager){
    return {
        restrict: 'AE',
        templateUrl: '/parts/allCities.html',
        link: function($scope) {
            $scope.allCities = citiesManager.getCities();
        },
        controller: function($scope){
            $scope.allCities = citiesManager.getCities();
            $scope.getDetails = function(citySelected) {
                $scope.selectedCityName = citySelected.name;
            };
        }
    }
}