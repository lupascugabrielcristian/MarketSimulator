angular.module('app').service('game', game);
function game(dataCalls, player, citiesManager) {
    return {
        saveGame: saveGame
    };

    function saveGame(){
        var playerObj = player.getPlayerData();
        var cities = citiesManager.getCities();
        var saveResponse = dataCalls.saveGameSituation(playerObj, cities);
        return saveResponse;
    }
}