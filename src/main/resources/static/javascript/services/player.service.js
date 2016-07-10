angular.module('app').service('player', player);

function player(){
    var playerData;
    return {
        setPlayerData: setPlayerData,
        getPlayerData: getPlayerData,
        getPlayerName: getPlayerName,
        setPlayerName: setPlayerName,
        getPlayerMoney: getPlayerMoney
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
}