angular.module('app').service('dataCalls', dataCalls);
function dataCalls($http){

    var getInitialCitiesUrl = "/initialcities";

    return {
        getInitialCities: getInitialCities
    };

    function getInitialCities(){
        return $http.get(getInitialCitiesUrl);
    }
}