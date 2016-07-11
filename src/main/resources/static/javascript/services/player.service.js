angular.module('app').service('player', player);

function player(){
    var playerData;
    return {
        setPlayerData: setPlayerData,
        getPlayerData: getPlayerData,
        getPlayerName: getPlayerName,
        setPlayerName: setPlayerName,
        getPlayerMoney: getPlayerMoney,
        getPlayerShips: getPlayerShips,
        setPlayerShips: setPlayerShips,
        addShips: addShips
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
        else {
            return "Unknown";
        }
    }

    function setPlayerName(newName) {
        playerData.name = newName;
    }

    function getPlayerMoney() {
        if(playerData) {
            return playerData.money;
        }
        else {
            return 0;
        }
    }

    function getPlayerShips() {
        if (playerData) {
            return playerData.ships;
        }
        return [];
    }

    function setPlayerShips(ships) {
        player.ships = ships;
    }

    function addShips(ships) {
        ships.forEach(function(ship){
            playerData.ships.push(ship);
        });
    }
}