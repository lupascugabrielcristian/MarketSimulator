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
        buyShip: buyShip,
        payIfPossible: payIfPossible,
        justPay: justPay,
        receivePayment: receivePayment,
        getMoney: getMoney
    };

    function setPlayerData (data) {
        playerData = data;
    }

    function getPlayerData() {
        return playerData;
    }

    function getPlayerName() {
        if (playerData) {
            return playerData.name;
        }
        else return "Unknown";
    }

    function setPlayerName(newName) {
        playerData.name = newName;
    }

    function getPlayerMoney() {
        if (playerData) {
            return playerData.money;
        }
        else return 0;
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

    function justPay(sum){
        playerData.money -= sum;
    }

    function payIfPossible(sum) {
        if (haveMoney(sum)){
            playerData.money -= sum;
            return true;
        }
        return false;
    }

    function haveMoney(sum) {
        return playerData.money >= sum;
    }

    function receivePayment(sum) {
        if (sum < 0) {
            console.log("Only positive payments accepted!");
            return;
        }

        player.money += sum;
    }

    function getMoney() {
        if (playerData) {
            return playerData.money;
        }
        return 0;
    }
}