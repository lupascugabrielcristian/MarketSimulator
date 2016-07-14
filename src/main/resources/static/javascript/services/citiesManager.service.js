angular.module('app').service('citiesManager', citiesManager);
function citiesManager(){
    var cities = [];


    return {
        addCities: addCities,
        setCities: setCities,
        getCities: getCities,
        getCityByName: getCityByName,
        nextDay: nextDay,
        timeStep: timeStep
    };

    function addCities(citiesToAdd) {
        citiesToAdd.forEach(function(c){
            cities.push(c);
        });
    }

    function setCities(newCities) {
        cities = newCities;
    }

    function getCities() {
        return cities;
    }

    function getCityByName(cityName) {
        try {
            cities.forEach(function (city) {
                if (city.name == cityName){
                    throw city;
                }
            });
            return null;
        }
        catch (city){
            return city;
        }
    }

    function nextDay() {
        timeStep(1);
    }

    // Cat % dintr-o zi sa inaintez
    function timeStep(dayRatio) {

        cities.forEach(function(city){
            advanceCity(city, dayRatio);
        });
    }

    function advanceCity(city, dayRatio) {
        var factories = city.factories;
        var commodities = city.commodities;

        factories.forEach(function(factory){
            var commodity = getProduction(factory, dayRatio);
            addToCityCommodities(commodity, commodities);
        });
    }

    function getProduction(factory, dayRation) {
        var quantityProduced = factory.productionRate * dayRation;
        return {
            name: factory.commodity.name,
            quantity: quantityProduced
        }
    }

    function addToCityCommodities(commodity, cityCommodities) {
        var commodityExists = false;
        cityCommodities.forEach(function(cityCommodity){
            if (cityCommodity.name.localeCompare(commodity.name) == 0) {
                cityCommodity.quantity += commodity.quantity;
                commodityExists = true;
            }
        });

        if (!commodityExists) {
            cityCommodities.push(commodity);
        }
    }
}