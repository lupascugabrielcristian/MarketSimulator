angular.module('app').controller('mapController', mapController);

function mapController($scope, drawingService, citiesManager, shipsManager, events, initialData, game, player) {
    var initialCities = null;
    var initialPlayer = null;
    var initialShips = null;
    var modalCreator = modals();

    if (!game.isLoaded()){
        // Use initialData when user did not choose a saved game
        initialCities = initialData.data.initialCities;
        initialPlayer = initialData.data.initialPlayer;
        citiesManager.setCities(initialCities);
        shipsManager.setShipsData(initialPlayer.ships);
        initialShips = initialPlayer.ships;
        player.setPlayerData(initialPlayer);

    } else {
        initialCities = citiesManager.getCities;
    }


    drawingService.drawCities(initialCities);
    drawingService.drawShips(initialShips);

    $scope.showPlayerDetails = function(){
        modalCreator.switchToIndex(modalCreator.PLAYER_DETAILS);
    };

    $scope.showAllCitiesPanel = function() {
        modalCreator.switchToIndex(modalCreator.ALL_CITIES);
    };

    $scope.showBuyShipPanel = function(){
        modalCreator.switchToIndex(modalCreator.BUY_SHIP);
    };

    $scope.showAllShipsPanel = function() {
        modalCreator.switchToIndex(modalCreator.ALL_SHIPS);
    };

    $scope.$on(events.pointClicked, function(event, args){
        /* Aici args este punctul pe care s-a facut click */
        $scope.showCityDetailsModal = !$scope.showCityDetailsModal;
        // $scope.$applyAsync();
        // $scope.cityClicked = args;
    });

    $scope.$on(events.nextDay, function(event, args){
        drawingService.drawShips(shipsManager.getShipsData());
    });

    $scope.$on(events.modal, function(event, args){
        var modalName = args.modal;
        modalCreator.switchToName(modalName, args.closeOthers);
        $scope.selectedShip = args.ship;
    });


    function modals() {
        function ModalView(name, initialState) {
            this.name = name;
            this.state = initialState;
        }

        var modalViews = [
            new ModalView("playerDetails", false),
            new ModalView("allCities", false),
            new ModalView("BuyShip", false),
            new ModalView("CityDetails", false),
            new ModalView("AllShips", false),
            new ModalView("Destinations", false)];

        function switchToIndex(index, closeOthers){
            var viewToSwitch = modalViews[index];
            switchModal(viewToSwitch,closeOthers);
        }

        function switchToName(modalName, closeOthers){
            try {
                modalViews.forEach(function(modal, index){
                    if (modalName == modal.name){
                        throw index;
                    }
                })
            }

            catch (indexFound){
                switchToIndex(indexFound, closeOthers);
            }
        }

        function switchModal(viewToSwitch, closeOthers) {

            if (closeOthers == undefined){
                closeOthers = true;
            }

            modalViews.forEach(function (modal) {
                if (modal == viewToSwitch) {
                    modal.state = !modal.state;
                }
                else {
                    if (closeOthers) {
                        modal.state = false;
                    }
                }
            });

            $scope.showPlayerDetailsModal = modalViews[0].state;
            $scope.allCitiesPanelIsVisible = modalViews[1].state;
            $scope.buyShipPanelIsVisible = modalViews[2].state;
            $scope.showCityDetailsModal = modalViews[3].state;
            $scope.allShipsModalIsVisible = modalViews[4].state;
            $scope.destinationsModalIsVisible = modalViews[5].state;
        }

        return {
            switchModal:  switchModal,
            switchToIndex: switchToIndex,
            switchToName: switchToName,
            modalViews: modalViews,
            PLAYER_DETAILS: 0,
            ALL_CITIES: 1,
            BUY_SHIP: 2,
            CITY_DETAILS: 3,
            ALL_SHIPS: 4,
            DESTINATIONS: 5
        }
    }
}