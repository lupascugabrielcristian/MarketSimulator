angular.module('app').service('citiesManager', citiesManager);
function citiesManager(){
    var cities = [];


    return {
        addCities: addCities,
        setCities: setCities,
        getCities: getCities,
        getCityByName: getCityByName,
        getCityById: getCityById,
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

    function getCityById(id) {
        try {
            cities.forEach(function (city) {
                if (city.id == id){
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

        factories.forEach(function(factory){
            var quantityProduced = factory.productionRate * dayRatio;

            increaseQuantityInCity(quantityProduced, factory.commodity, city);
        });
    }


    function increaseQuantityInCity(byQuantity, forCommodity, inCity) {

        var cityCommodity = getCommodityOrCreate(forCommodity, inCity);
        cityCommodity.quantity += byQuantity;
    }

    function getCommodityOrCreate(forCommodity, inCity){
        try {
            inCity.commodities.forEach(function(commodity){
                if (commodity.name == forCommodity.name) {
                    throw commodity;
                }
            });
        }
        catch (commodityFound) {
            return commodityFound;
        }

        if (!inCity.commodities) {
            inCity.commodities = [];
        }

        var commodityClone = angular.copy(forCommodity);
        commodityClone.quantity = 0;
        inCity.commodities.push(commodityClone);
        return commodityClone;
    }
}