angular.module('app').service('shipOperator', shipOperator);

function shipOperator() {
    return {
        putCargoOnShip: putCargoOnShip,
        removeCargoFromShip: removeCargoFromShip
    };


    function putCargoOnShip(ship, cargo) {

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