angular.module('app').controller('commoditiesViewController', commoditiesViewController);

function commoditiesViewController($scope, initialData, citiesManager) {
    $scope.availableCommodities = initialData.data;
    $scope.selectedCommodityName = null;
    $scope.selectedCommodity = null;
    $scope.prices = [];
    $scope.editCommodityModalVisible = false;

    $scope.findCommodity = function() {
        try {
            $scope.availableCommodities.forEach(function(commodity){
                if (commodity.name == $scope.selectedCommodityName){
                    throw commodity;
                }
            });
        }
        catch (commodity){
            $scope.selectedCommodity = commodity;
            $scope.prices = findPrices()
        }
    };


    $scope.editCommodity = function(){
        $scope.commodityForEdit = angular.copy($scope.selectedCommodity);
        $scope.editCommodityModalVisible = true;
    };


    function findPrices(){
        var allCities = citiesManager.getCities();
        var pricesObjects = [];

        allCities.map(findCommodityPrice);

        function findCommodityPrice(city) {
            city.commodities.forEach(function(commodity){
                if (commodity.name == $scope.selectedCommodityName){
                    var price = commodity.currentPrice;
                    if (!price){
                        price = commodity.defaultPrice + " D";
                    }

                    pricesObjects.push({
                        city: city.name,
                        value: price
                    });
                }
            });
        }

        return pricesObjects;
    }




}