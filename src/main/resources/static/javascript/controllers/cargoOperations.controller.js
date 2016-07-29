angular.module('app').controller('cargoOperationsController', cargoOperationsController);

function cargoOperationsController($scope, $stateParams, shipsManager, shipOperator, citiesManager, cityOperator, financeOperator, player, ngAudio, events) {
    $scope.ship = shipsManager.getShipById($stateParams.shipId);
    $scope.city = citiesManager.getCityById($stateParams.cityId);
    $scope.playerMoney = player.getMoney();
    var selectedCityCommodities = [];
    var selectedShipsCargos = [];
    calculateRemainingSpace();

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

    function processCargo(cargo){
        financeOperator.makeSellTransaction(cargo);
        cityOperator.putCargo($scope.city, cargo);
        shipOperator.removeCargoFromShip($scope.ship, cargo);
        removeObjectFromArray(cargo, selectedShipsCargos);
        $scope.playerMoney = player.getMoney();
    }

    function processDesiredCommodity(commodity) {
        if (!checkForMoney(commodity)){
            $scope.$broadcast(events.message, {
                message: "Cannot buy " + commodity.name + ". You don't have enough money"
            });
            return;
        }

        if (!checkForVolume(commodity)){
            $scope.$broadcast(events.message, {
                message: "Cannot buy " + commodity.name + ". You don't have enough space"
            });
            return;
        }

        makeTransaction(commodity);
        putCommodityOnShip(commodity);
        removeCommodityFromCity(commodity);
        removeCommodityFromSelection(commodity);
        $scope.playerMoney = player.getMoney();
    }

    function removeCommodityFromCity(commodity) {
        try {
            $scope.city.commodities.forEach(function (cmdity, index) {
                if (cmdity == commodity) {
                    throw index;
                }
            });
        }
        catch (index){
            $scope.city.commodities.splice(index, 1);
        }
    }

    function putCommodityOnShip(commodity){

        var cargo = findCargoOnShipOrCreate(commodity);
        cargo.commodity.quantity += commodity.quantity;
        var volumeRequired = commodity.quantity * commodity.volumeCoefficient;
        $scope.ship.occupiedVolume += volumeRequired;
        $scope.ship.remainingSpace = $scope.ship.capacity - $scope.ship.occupiedVolume;
    }


    function findCargoOnShipOrCreate(commodity) {
        var commodityClone = angular.copy(commodity);
        if (!$scope.ship.cargos) {
            $scope.ship.cargos = [];
        }
        try {
            $scope.ship.cargos.forEach(function (cargo) {
                if (cargo.commodity.name == commodityClone.name) {
                    throw cargo;
                }
            });
        }
        catch (foundCargo) {
            return foundCargo;
        }

        var newCargo = {
            commodity: commodityClone,
            shipId: $scope.ship.id,
            departureCityId: $scope.city.id
        };
        newCargo.commodity.quantity = 0;
        $scope.ship.cargos.push(newCargo);
        return newCargo;
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

    function makeTransaction(commodity) {
        var price = commodity.currentPrice;
        if (!price) {
            price = commodity.defaultPrice;
        }

        var value = price * commodity.quantity;
        player.justPay(value);
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
