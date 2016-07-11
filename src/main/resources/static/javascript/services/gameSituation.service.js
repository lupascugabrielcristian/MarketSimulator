angular.module('app').service('game', game);
function game(dataCalls, player, citiesManager, timeService) {
    var loaded = false;
    return {
        saveGame: saveGame,
        loadGame: loadGame,
        isLoaded: isLoaded,
        makeLoaded: makeLoaded
    };

    function saveGame(){
        var playerObj = player.getPlayerData();
        playerObj.days = timeService.getDayNumber();
        var cities = citiesManager.getCities();
        var saveResponse = dataCalls.saveGameSituation(playerObj, cities);
        return saveResponse;
    }

    function loadGame(gameSituation) {
        player.setPlayerData(gameSituation.player);
        timeService.setDayNumber(gameSituation.player.days);
        citiesManager.setCities(gameSituation.cities);
        loaded = true;
    }

    function isLoaded() {
        return loaded;
    }

    function makeLoaded() {
        loaded = true;
    }
}