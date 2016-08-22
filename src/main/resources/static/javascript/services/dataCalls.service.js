angular.module('app').service('dataCalls', dataCalls);
function dataCalls($http){

    var getInitialCitiesUrl = "/initialcities";
    var initializeUrl = "/initial";
    var saveGameSituationUrl = '/save';
    var loadAllUrl = "/loadAll";
    var loadGameByIdUrl = "/load";
    var getAvailableShipsUrl = "/availableShips";
    var getAvailableCommoditiesUrl = "/availableCommodities";

    return {
        getInitialCities: getInitialCities,
        initialize: initialize,
        saveGameSituation: saveGameSituation,
        loadAllGames: loadAllGames,
        loadOneGame: loadOneGame,
        getAvailableShips: getAvailableShips,
        getAvailableCommodities: getAvailableCommodities
    };

    function getInitialCities(){
        return $http.get(getInitialCitiesUrl);
    }

    function initialize(){
        return $http.get(initializeUrl);
    }

    function saveGameSituation(currentPlayer, currentCities, currentShips, id) {

        var request = {
            gameId: id,
            player: currentPlayer,
            cities: currentCities,
            ships: currentShips
        };

        return $http.post(saveGameSituationUrl, request);
    }

    function loadAllGames() {
        return $http.get(loadAllUrl)
    }

    function loadOneGame(id) {
        return $http.get(loadGameByIdUrl + "?id=" + id)
    }

    function getAvailableShips() {
        return $http.get(getAvailableShipsUrl);
    }

    function getAvailableCommodities() {
        return $http.get(getAvailableCommoditiesUrl);
    }
}
