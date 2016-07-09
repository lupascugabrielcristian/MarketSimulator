angular.module('app').service('player', player);

function player(){
    var playerData;
    return {
        setPlayerData: setPlayerData,
        getPlayerName: getPlayerName,
        setPlayerName: setPlayerName,
        getPlayerMoney: getPlayerMoney
    };

    function setPlayerData (data) {
        playerData = data;
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