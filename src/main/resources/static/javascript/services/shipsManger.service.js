angular.module('app').service('shipsManager', shipsManager);

function shipsManager() {
    var ships = [];

    return {
        setShipsData: setShipsData,
        getShipsData: getShipsData,
        getShipByName: getShipByName,
        addShip: addShip,
        timeStep: timeStep,
        nextDay: nextDay
    };

    function setShipsData(shipData){
        ships = shipData;
    }

    function getShipsData() {
        return ships;
    }

    function getShipByName(shipName) {
        var shipFound = null;
        try {
            ships.forEach(function (ship) {
                if (ship.name == shipName) {
                    throw ship;
                }
            });
        }
        catch (e){
            shipFound = e;
        }
        return shipFound;
    }

    function addShip(newShip) {
        ships.push(newShip);
    }

    function nextDay(){
        timeStep(1);
    }

    function timeStep(dayRatio){
        ships.forEach(function(ship){
             advanceShip(ship, dayRatio);
        });
    }


    function advanceShip(ship, dayRatio){
        if (!ship.destination){
            return;
        }

        var distance = lineDistance(ship.position, ship.destination);
        distance = distance / dayRatio;
        var angle = calculateAngle(ship.position, ship.destination);
        var newPosition = getFinalPosition(distance, angle, ship.position);
        ship.position.x = newPosition.x;
        ship.position.y = newPosition.y;
    }

    function lineDistance( point1, point2 )
    {
        var xs = 0;
        var ys = 0;

        xs = point2.x - point1.x;
        xs = xs * xs;

        ys = point2.y - point1.y;
        ys = ys * ys;

        return Math.sqrt( xs + ys );
    }

    function calculateAngle(p1, p2) {

        // angle in radians
        var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        // angle in degrees
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        return angleRadians;
    }

    function getFinalPosition(distance, angle, originalPosition) {
        var x = Math.cos(angle) * distance + originalPosition.x;
        var y = Math.sin(angle) * distance + originalPosition.y;

        return {
            finalX:x,
            finalY:y
        }
    }
}