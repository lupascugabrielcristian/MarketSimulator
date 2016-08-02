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
        timeStep: timeStep,
        addCommodity: addCommodity,
        getCommodityInCity: getCommodityInCity,
        getPopulationInCity: getPopulationInCity,
        getTotalPopulation: getTotalPopulation
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

    function addCommodity(commodity, city) {
        var cityCommodity = getCommodityOrCreate(commodity, city);
        cityCommodity.quantity += commodity.quantity;
    }

    function getCommodityInCity(shipCommodity, inCity) {
        try {
            inCity.commodities.forEach(function(commodity){
                if (shipCommodity.name == commodity.name) {
                    throw commodity;
                }
            });
        }
        catch (commodityFound) {
            return commodityFound.quantity;
        }

        return 0;
    }

    function getPopulationInCity(inCity) {
        try {
            cities.forEach(function(city){
                if (inCity.name == city.name) {
                    throw city;
                }
            });
        }
        catch (cityFound) {
            return cityFound.population;
        }

        return 0;
    }

    function getTotalPopulation() {
        function add (previous, currentValue) {
            return previous.population + currentValue.population;
        }

        var total = cities.reduce(add);
        if (!total) total = 1;
        return total;
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
