angular.module('app').controller('cargoOperationsController', cargoOperationsController);

function cargoOperationsController($scope, $stateParams, shipsManager, citiesManager, player, ngAudio, events) {
    $scope.ship = shipsManager.getShipById($stateParams.shipId);
    $scope.city = citiesManager.getCityById($stateParams.cityId);
    var selectedCityCommodities = [];
    var selectedShipsCommodities = [];
    calculateRemainingSpace();

    $scope.checkCommodity = function(commodity, index){
        var selected = commodity.selected;
        if (selected == "YES") {
            selectCityCommodity(commodity);
        }
        else if (selected == "NO"){
            deselectCityCommodity(commodity);
        }
        else {
            $scope.$broadcast(events.message, {
                message: "Weird option received at checkbox selection"
            });
        }
    };

    $scope.buyCommodity = function() {
        selectedCityCommodities.forEach(processDesiredCommodity);
    };

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
      if (!$scope.ship.cargos){
          $scope.ship.cargos = [];
      }
      try {
        $scope.ship.cargos.forEach(function(cargo){
            if (cargo.commodity.name == commodity.name) {
              throw cargo;
            }
        });
      }
      catch(foundCargo) {
        return foundCargo;
      }

      var newCargo = {
          commodity: commodity,
          shipId: $scope.ship.id,
          departureCityId: $scope.city.id
      };
      newCargo.commodity.quantity = 0;
      $scope.ship.cargos.push(newCargo);
      return newCargo;
    }

    function selectCityCommodity(commodity) {
        if (selectedCityCommodities.indexOf(commodity) != -1){
            // Somehow is already in the selected list. Should not be though
            return;
        }

        selectedCityCommodities.push(commodity);
    }

    function deselectCityCommodity(commodity) {
        try {
            selectedCityCommodities.forEach(function(cmdity, index){
                if (cmdity == commodity) {
                    throw index;
                }
            });
        }
        catch (foundIndex){
            selectedCityCommodities.splice(foundIndex, 1);
        }
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
