angular.module('app').service('game', game);
function game(dataCalls, player, citiesManager, shipsManager, timeService) {
    var gameId = "";
    return {
        saveGame: saveGame,
        loadGame: loadGame,
        isLoaded: isLoaded,
        makeLoaded: makeLoaded,
        setLoaded: setLoaded
    };

    function saveGame(){
        var playerObj = player.getPlayerData();
        var cities = citiesManager.getCities();
        var ships = shipsManager.getShipsData();
        playerObj.days = timeService.getDayNumber();
        var saveResponse = dataCalls.saveGameSituation(playerObj, cities, ships, gameId);
        return saveResponse;
    }

    function loadGame(gameSituation) {
        player.setPlayerData(gameSituation.player);
        timeService.setDayNumber(gameSituation.player.days);
        citiesManager.setCities(gameSituation.cities);
        shipsManager.setShipsData(gameSituation.ships);
        gameId = gameSituation.id;
    }

    function isLoaded() {
        return loaded;
    }

    function makeLoaded() {
        loaded = true;
    }

    function setLoaded(loadedValue) {
        loaded = loadedValue;
    }
}
