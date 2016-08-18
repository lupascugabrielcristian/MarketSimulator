angular.module('app').controller('cargoOperationsController', cargoOperationsController);

function cargoOperationsController($scope, $rootScope, $stateParams, shipsManager, shipOperator, citiesManager, cityOperator, financeOperator, player, market, ngAudio, events, loadingGraph) {
    $scope.ship = shipsManager.getShipById($stateParams.shipId);
    $scope.city = citiesManager.getCityById($stateParams.cityId);
    $scope.playerMoney = player.getMoney();
    $scope.requiredMoney = 0;
    var selectedCityCommodities = [];
    var selectedShipsCargos = [];
    shipOperator.calculateRemainingSpace($scope.ship);
    calculatePrices();
    loadingGraph.drawInitialGraph($scope.ship);
    loadingGraph.updateGraph($scope.ship);

    $scope.checkCommodity = function(commodity, index, value){
        var selected = commodity.selected;
        if (selected == "YES") {
            putObjectInArray(commodity, selectedCityCommodities);
        }
        else if (selected == "NO"){
            removeObjectFromArray(commodity, selectedCityCommodities);
        }
        else {
            $scope.$broadcast(events.message, {
                message: "Weird option received at commodity checkbox selection"
            });
        }
        updateRequiredMoney();
    };

    $scope.checkCargo = function(cargo, index, value) {
        var selected = cargo.selected;
        if (selected == "YES") {
            putObjectInArray(cargo, selectedShipsCargos);
        }
        else if (selected == "NO"){
            removeObjectFromArray(cargo, selectedShipsCargos);
        }
        else {
            $scope.$broadcast(events.message, {
                message: "Weird option received at cargo checkbox selection"
            });
        }
    };

    $scope.buyCommodity = function() {
        selectedCityCommodities.forEach(processDesiredCommodity);
        loadingGraph.updateGraph($scope.ship);
    };

    $scope.sellToCity = function() {
        selectedShipsCargos.forEach(processCargo);
        loadingGraph.updateGraph($scope.ship);
    };

    $scope.discharge = function() {
        console.log("Not implemented");
    };

    $scope.testAlert = function(){
      $rootScope.$broadcast(events.alert, "Test de alert");
    };

    $scope.openFractionModal = function(commodity){
        $rootScope.$broadcast(events.modal, {
            id: "buy_partially_directive",
            commodity: commodity,
            ship: $scope.ship,
            city: $scope.city
        });
    };

    function updateRequiredMoney() {
        $scope.requiredMoney = 0;
        selectedCityCommodities.forEach(function(cityCommodity){
            $scope.requiredMoney += cityCommodity.currentPrice * cityCommodity.quantity;
        });
    }

    function processCargo(cargo){
        financeOperator.makeSellTransaction(cargo);
        cityOperator.putCargo($scope.city, cargo);
        shipOperator.removeCargoFromShip($scope.ship, cargo);
        removeObjectFromArray(cargo, selectedShipsCargos);
        $scope.playerMoney = player.getMoney();
    }

    function processDesiredCommodity(commodity) {
        if (!financeOperator.canBuyCommodity(commodity)){
            $rootScope.$broadcast(events.alert,
                "Cannot buy " + commodity.name + ". You don't have enough money"
            );
            return;
        }

        if (!shipsManager.haveVolumeForCommodity($scope.ship, commodity)){
            var requiredVolume = commodity.quantity * commodity.volumeCoefficient;
            $rootScope.$broadcast(events.alert,
                "Cannot buy " + commodity.name + ". \nYou don't have enough space. You need " + requiredVolume
            );
            return;
        }

        financeOperator.makePaymentToCity($scope.city, commodity);
        shipOperator.putCommodityOnShip($scope.ship, commodity, $scope.city);
        cityOperator.removeCommodity($scope.city, commodity);
        removeCommodityFromSelection(commodity);
        $scope.playerMoney = player.getMoney();
        updateRequiredMoney();
    }

    function putObjectInArray(object, array) {
        if (array.indexOf(object) != -1){
            return;
        }

        array.push(object);
    }

    function removeObjectFromArray(object, array) {
        try {
            array.forEach(function(item, index){
               if (item == object){
                   throw index;
               }
            });
        }
        catch (foundIndex) {
            array.splice(foundIndex, 1);
            return;
        }

        console.log("Could not find this object to remove it");
    }

    function calculatePrices() {
        // Pentru marfa din nava
        if ($scope.ship && $scope.ship.cargos) {
            $scope.ship.cargos.forEach(function (cargo) {
                market.getSellPriceForCommodity(cargo.commodity, $scope.city);
            });
        }

        // Pentru marfa din oras
        if ($scope.city && $scope.city.commodities) {
            $scope.city.commodities.forEach(function(commodity){
                market.getBuyPriceForCommodity(commodity);
            });
        }
    }

    function removeCommodityFromSelection(commodity) {
        selectedCityCommodities.forEach(function(comdty, index){
            try {
                if (commodity == comdty) {
                    throw index;
                }
            }
            catch (index) {
                commodity.selected = "NO";
                selectedCityCommodities.splice(index, 1);
            }
        });
    }
}
