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
            $scope.getCityDetails = function(citySelected) {
                var selectedCity = citiesManager.getCityByName(citySelected.name);
                $scope.selectedCityName = selectedCity.name;
                $scope.factories =  selectedCity.factories;
                $scope.commodities = selectedCity.commodities;
            };
        }
    }
}