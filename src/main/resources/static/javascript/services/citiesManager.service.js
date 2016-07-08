angular.module('app').service('citiesManager', citiesManager);
function citiesManager(){
    var cities = [];


    return {
        addCities: addCities,
        getCities: getCities
    };

    function addCities(citiesToAdd) {
        citiesToAdd.forEach(function(c){
            cities.push(c);
        });
    }

    function getCities() {
        return cities;
    }
}