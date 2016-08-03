angular.module('app').controller('cargoOperationsController', cargoOperationsController);

function cargoOperationsController($scope, $rootScope, $stateParams, shipsManager, shipOperator, citiesManager, cityOperator, financeOperator, player, market, ngAudio, events) {
    $scope.ship = shipsManager.getShipById($stateParams.shipId);
    $scope.city = citiesManager.getCityById($stateParams.cityId);
    $scope.playerMoney = player.getMoney();
    $scope.requiredMoney = 0;
    var selectedCityCommodities = [];
    var selectedShipsCargos = [];
    calculateRemainingSpace();
    calculatePrices();

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
        upadateRequiredMoney();
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
    };

    $scope.sellToCity = function() {
        selectedShipsCargos.forEach(processCargo);
    };

    $scope.discharge = function() {
        console.log("Not implemented");
    };

    $scope.testAlert = function(){
      $rootScope.$broadcast(events.alert, "Test de alert");
    }

    function upadateRequiredMoney() {
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
        if (!checkForMoney(commodity)){
            $roorScope.$broadcast(events.alert,
                "Cannot buy " + commodity.name + ". You don't have enough money"
            );
            return;
        }

        if (!checkForVolume(commodity)){
            $rootScope.$broadcast(events.alert,
                "Cannot buy " + commodity.name + ". You don't have enough space"
            );
            return;
        }

        financeOperator.makePaymentToCity(commodity);
        shipOperator.putCommodityOnShip($scope.ship, commodity, $scope.city);
        cityOperator.removeCommodityFromCity($scope.city, commodity);
        removeCommodityFromSelection(commodity);
        $scope.playerMoney = player.getMoney();
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



    function checkForMoney(commodity){
        var unitPrice = commodity.currentPrice;
        if (!unitPrice) {
            unitPrice = commodity.defaultPrice;
        }
        var price = unitPrice * commodity.quantity;
        var playerMoney = player.getPlayerData().money;

         return playerMoney >= price;
    }

    function checkForVolume(commodity) {
        var totalOccupiedVolume = calculateRemainingSpace();

        var requiredVolume = commodity.quantity * commodity.volumeCoefficient;
        var remainingVolume = $scope.ship.capacity - totalOccupiedVolume;

        return remainingVolume > 0 && remainingVolume >= requiredVolume;
    }

    function calculateRemainingSpace() {
        if (!$scope.ship) {
            return 0;
        }

        var totalOccupiedVolume = 0;
        function addVolume (cargo){
            var volume = cargo.commodity.quantity * cargo.commodity.volumeCoefficient;
            totalOccupiedVolume += volume;
        }

        if ($scope.ship.cargos){
            $scope.ship.cargos.forEach(addVolume);
        }

        $scope.ship.occupiedVolume = totalOccupiedVolume;
        $scope.ship.remainingSpace = $scope.ship.capacity - totalOccupiedVolume;
        return totalOccupiedVolume;
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
