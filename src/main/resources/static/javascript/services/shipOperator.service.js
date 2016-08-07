angular.module('app').service('shipOperator', shipOperator);

function shipOperator() {
    return {
        putCommodityOnShip: putCommodityOnShip,
        removeCargoFromShip: removeCargoFromShip,
        haveVolumeForCommodity: haveVolumeForCommodity,
        calculateRemainingSpace: calculateRemainingSpace
    };


    function putCommodityOnShip(ship, commodity, city) {
        var cargo = findCargoOnShipOrCreate(ship, commodity, city);
        cargo.commodity.quantity += commodity.quantity;
        var volumeRequired = commodity.quantity * commodity.volumeCoefficient;
        ship.occupiedVolume += volumeRequired;
        ship.remainingSpace = ship.capacity - ship.occupiedVolume;
    }

    function haveVolumeForCommodity(ship, commodity){
        var totalOccupiedVolume = calculateRemainingSpace(ship);

        var requiredVolume = commodity.quantity * commodity.volumeCoefficient;
        var remainingVolume = ship.capacity - totalOccupiedVolume;

        return remainingVolume > 0 && remainingVolume >= requiredVolume;
    }

    function calculateRemainingSpace(ship) {
        if (!ship) {
            return 0;
        }

        var totalOccupiedVolume = 0;
        function addVolume (cargo){
            var volume = cargo.commodity.quantity * cargo.commodity.volumeCoefficient;
            totalOccupiedVolume += volume;
        }

        if (ship.cargos){
            ship.cargos.forEach(addVolume);
        }

        ship.occupiedVolume = totalOccupiedVolume;
        ship.remainingSpace = ship.capacity - totalOccupiedVolume;
        return totalOccupiedVolume;
    }

    function findCargoOnShipOrCreate(ship, commodity, city) {
        var commodityClone = angular.copy(commodity);
        if (!ship.cargos) {
            ship.cargos = [];
        }
        try {
            ship.cargos.forEach(function (cargo) {
                if (cargo.commodity.name == commodityClone.name) {
                    throw cargo;
                }
            });
        }
        catch (foundCargo) {
            return foundCargo;
        }

        var newCargo = {
            commodity: commodityClone,
            shipId: ship.id,
            departureCityId: city.id
        };
        newCargo.commodity.quantity = 0;
        ship.cargos.push(newCargo);
        return newCargo;
    }

    function removeCargoFromShip(ship, cargo) {
        if (!ship || !cargo) {
            console.log("Ship operator could not handle null params");
            return false;
        }

        var volume = getVolumeOfCargo(cargo);
        var isFound = removeObjectFromArray(cargo, ship.cargos);
        ship.occupiedVolume -= volume;
        ship.remainingSpace = ship.capacity - ship.occupiedVolume;
        return isFound;
    }

    // <editor-fold desc="Implementation">
    function getVolumeOfCargo(cargo) {
        var commodity = cargo.commodity;

        if (!commodity) {
            console.log("Counld not recognize commodity");
            return;
        }

        return commodity.quantity * commodity.volumeCoefficient;
    }

    function putObjectInArray(object, array) {
        if (array.indexOf(object) != -1){
            return;
        }

        array.push(object);
    }

    function removeObjectFromArray(object, array) {
        try {
            array.forEach(function(item, index){
                if (item == object || item.name == object.name){
                    throw index;
                }
            });
        }
        catch (foundIndex) {
            array.splice(foundIndex, 1);
            return true;
        }

        console.log("Could not find this object to remove it");
        return false;
    }

    // </editor-fold>
}
