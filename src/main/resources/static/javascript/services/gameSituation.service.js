angular.module('app').service('game', game);
function game(dataCalls, player, citiesManager) {
    var loaded = false;
    return {
        saveGame: saveGame,
        loadGame: loadGame,
        isLoaded: isLoaded,
        makeLoaded: makeLoaded
    };

    function saveGame(){
        var playerObj = player.getPlayerData();
        var cities = citiesManager.getCities();
        var saveResponse = dataCalls.saveGameSituation(playerObj, cities);
        return saveResponse;
    }

    function loadGame(gameSituation) {
        player.setPlayerData(gameSituation.player);
        citiesManager.addCities(gameSituation.cities);
        loaded = true;
    }

    function isLoaded() {
        return loaded;
    }

    function makeLoaded() {
        loaded = true;
    }
}