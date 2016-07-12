angular.module('app').controller('mapController', mapController);

function mapController($scope, drawingService, citiesManager, events, initialData, game, player) {
    $scope.showPlayerDetailsModal = false;
    $scope.showShipDetailsModal = false;
    $scope.showCityDetailsModal = false;
    $scope.allCitiesPanelIsVisible = false;
    $scope.buyShipPanelIsVisible = false;

    var initialCities = null;
    var initialPlayer = null;
    var modalCreator = modals();

    if (!game.isLoaded()){
        // Use initialData when user did not choose a saved game
        initialCities = initialData.data.initialCities;
        initialPlayer = initialData.data.initialPlayer;
        citiesManager.setCities(initialCities);
        player.setPlayerData(initialPlayer);
    } else {
        initialCities = citiesManager.getCities;
    }


    drawingService.drawCities(initialCities);

    $scope.showPlayerDetails = function(){
        modalCreator.switchToIndex(modalCreator.PLAYER_DETAILS);
    };

    $scope.showAllCitiesPanel = function() {
        modalCreator.switchToIndex(modalCreator.ALL_CITIES);
    };

    $scope.showBuyShipPanel = function(){
        modalCreator.switchToIndex(modalCreator.BUY_SHIP);
    };

    $scope.$on(events.pointClicked, function(event, args){
        /* Aici args este punctul pe care s-a facut click */
        $scope.showCityDetailsModal = !$scope.showCityDetailsModal;
        $scope.$applyAsync();
        $scope.cityClicked = args;
    });


    function modals() {
        function ModalView(name, initialState) {
            this.name = name;
            this.state = initialState;
        }

        modalViews = [
            new ModalView("playerDetails", false),
            new ModalView("allCities", false),
            new ModalView("BuyShip", false),
            new ModalView("CityDetails", false)];

        function switchToIndex(index){
            var viewToSwitch = modalViews[index];
            switchModal(viewToSwitch);
        }

        function switchModal(viewToSwitch) {
            modalViews.forEach(function (modal) {
                if (modal == viewToSwitch) {
                    modal.state = !modal.state;
                }
                else {
                    modal.state = false;
                }
            });

            $scope.showPlayerDetailsModal = modalViews[0].state;
            $scope.allCitiesPanelIsVisible = modalViews[1].state;
            $scope.buyShipPanelIsVisible = modalViews[2].state;
            $scope.showCityDetailsModal = modalViews[3].state;
        }

        return {
            switchModal:  switchModal,
            switchToIndex: switchToIndex,
            modalViews: modalViews,
            PLAYER_DETAILS: 0,
            ALL_CITIES: 1,
            BUY_SHIP: 2,
            CITY_DETAILS: 3
        }
    }
}