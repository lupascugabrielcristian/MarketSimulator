angular.module('app').service('cityOperator', cityOperator);

function cityOperator() {
    return {
        putCargo: putCargo,
        removeCommodity: removeCommodity
    };


    function putCargo(city, cargo) {
        var commodity = findCommodityInCityOrCreate(city, cargo);
        commodity.quantity += cargo.commodity.quantity;
        return commodity;
    }


    function removeCommodity(city, commodity) {
        try {
            city.commodities.forEach(function (cmdity, index) {
                if (cmdity.name == commodity.name || cmdity == commodity) {
                    throw index;
                }
            });
        }
        catch (index){
            city.commodity[index].quantity -= commodity.quantity;
            if (city.commodity.quantity == 0) {
                city.commodities.splice(index, 1);
            }
        }
    }

    function findCommodityInCityOrCreate(city, cargo) {
        var cargoClone = angular.copy(cargo);
        if (!city.commodities){
            city.commodities = [];
        }

        try {
            city.commodities.forEach(function(cityCommodity){
                if (cityCommodity.name == cargo.commodity.name) {
                    throw cityCommodity;
                }
            });
        }
        catch (foundCommodity) {
            return foundCommodity;
        }

        var newCommodity = cargoClone.commodity;
        newCommodity.quantity = 0;
        city.commodities.push(newCommodity);
        return newCommodity;
    }
}
