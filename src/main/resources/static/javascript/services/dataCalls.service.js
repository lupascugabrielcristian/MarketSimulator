angular.module('app').service('dataCalls', dataCalls);
function dataCalls($http){

    var getInitialCitiesUrl = "/initialcities";
    var initializeUrl = "/initial";
    var saveGameSituationUrl = '/save';
    var loadAllUrl = "/loadAll";
    var loadGameByIdUrl = "/load";

    return {
        getInitialCities: getInitialCities,
        initialize: initialize,
        saveGameSituation: saveGameSituation,
        loadAllGames: loadAllGames,
        loadOneGame: loadOneGame
    };

    function getInitialCities(){
        return $http.get(getInitialCitiesUrl);
    }

    function initialize(){
        return $http.get(initializeUrl);
    }

    function saveGameSituation(currentPlayer, currentCities) {

        var request = {
            player: currentPlayer,
            cities: currentCities,
            ships: []
        };

        return $http.post(saveGameSituationUrl, request);
    }

    function loadAllGames() {
        return $http.get(loadAllUrl)
    }

    function loadOneGame(id) {
        return $http.get(loadGameByIdUrl + "?id=" + id)
    }
}