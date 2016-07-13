angular.module('app').service('player', player);

function player($rootScope, events){
    var playerData;
    return {
        setPlayerData: setPlayerData,
        getPlayerData: getPlayerData,
        getPlayerName: getPlayerName,
        setPlayerName: setPlayerName,
        getPlayerMoney: getPlayerMoney,
        getPlayerShips: getPlayerShips,
        getPlayerShip: getPlayerShip,
        setPlayerShips: setPlayerShips,
        buyShip: buyShip
    };

    function setPlayerData (data) {
        playerData = data;
    }

    function getPlayerData() {
        return playerData;
    }

    function getPlayerName() {
        return playerData.name;
    }

    function setPlayerName(newName) {
        playerData.name = newName;
    }

    function getPlayerMoney() {
        return playerData.money;
    }

    function getPlayerShips() {
        if (playerData) {
            return playerData.ships;
        }
        return [];
    }

    function getPlayerShip(shipName) {
        try {
            playerData.ships.forEach(function (ship) {
                if (ship.name == shipName) {
                    throw new Error(ship);
                }
            });
        }
        catch (e){
            return e.data;
        }
    }

    function setPlayerShips(ships) {
        playerData.ships = ships;
    }

    function buyShip(shipToBuy) {
        if (playerData.money >= shipToBuy.price) {
            playerData.money -= shipToBuy.price;

            if (playerData.ships == null ){
                playerData.ships = [];
            }

            playerData.ships.push(shipToBuy);

            $rootScope.$broadcast(events.shipBought, {
                playerShips: playerData.ships,
                playerMoney: playerData.money
            });
        }
        else {
            $rootScope.$broadcast(events.message, {
                message: "Cannot buy ship. Not enough money"
            });
        }


    }
}