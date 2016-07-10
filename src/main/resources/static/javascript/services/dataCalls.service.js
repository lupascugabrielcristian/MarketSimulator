angular.module('app').service('dataCalls', dataCalls);
function dataCalls($http){

    var getInitialCitiesUrl = "/initialcities";
    var initializeUrl = "/initial";
    var saveGameSituationUrl = '/save';

    return {
        getInitialCities: getInitialCities,
        initialize: initialize,
        saveGameSituation: saveGameSituation
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
}