angular.module('app').directive('buyPartially', buyPartially);

function buyPartially(){
    return {
        restrict: 'AE',
        scope: true,
        templateUrl: '/parts/buyPartially.html',
        link: function() {

        },
        controller: function ($scope, events, shipOperator, cityOperator, player){
            $scope.id = "buy_partially_directive";
            $scope.visibility = true;
            $scope.ratio = 0;
            $scope.necessaryVolume = 0;
            $scope.necessaryMoney = 0;
            $scope.commodity = null;
            $scope.ship = null;
            $scope.city = null;
            $scope.volumeExceeded = false;
            $scope.priceExceeded = false;

            $scope.increaseRatio = function() {
                if ($scope.ratio == 100) {
                    return;
                }

                $scope.ratio += 1;
                $scope.necessaryVolume = calculateVolumeForRatio($scope.ratio, $scope.commodity);
                $scope.necessaryMoney = calculatePriceForRatio($scope.ratio, $scope.commodity);

                checkVolume($scope.necessaryVolume);
                checkPrice($scope.necessaryMoney);
            };

            $scope.decreaseRatio = function() {
                if ($scope.ratio == 0){
                    return
                }

                $scope.ratio -= 1;
                $scope.necessaryVolume = calculateVolumeForRatio($scope.ratio, $scope.commodity);
                $scope.necessaryMoney = calculatePriceForRatio($scope.ratio, $scope.commodity);

                checkVolume($scope.necessaryVolume);
                checkPrice($scope.necessaryMoney);
            };

            $scope.buy = function() {
                var commodityTOBuy = angular.copy($scope.commodity);
                var quantityToBuy = Math.round($scope.ratio * $scope.commodity.quantity) / 100;
                commodityTOBuy.quantity = quantityToBuy;
                shipOperator.putCommodityOnShip($scope.ship, commodityTOBuy, $scope.city);
                cityOperator.removeCommodity($scope.city, commodityTOBuy);
                player.justPay($scope.necessaryMoney);
                $scope.ratio = 0;
                $scope.necessaryMoney = 0;
                $scope.necessaryVolume = 0;
                $scope.visibility = false;
                $scope.$parent.playerMoney = player.getMoney();
            };

            $scope.cancel = function() {
                $scope.visibility = false;
            };

            $scope.$on(events.modal, function(event, args){
                if (args.id != $scope.id) return;

                $scope.visibility = !$scope.visibility;

                if ($scope.visibility) {
                    $scope.commodity = args.commodity;
                    $scope.ship = args.ship;
                    $scope.city = args.city;
                }
            });

            function calculateVolumeForRatio(ratio, commodity){
                ratio = ratio / 100;
                var result = ratio * commodity.quantity * commodity.volumeCoefficient;
                result = Math.round(result * 100) / 100;
                return result;
            }

            function calculatePriceForRatio(ratio, commodity) {
                if (!commodity.currentPrice) {
                    commodity.currentPrice = commodity.defaultPrice;
                }
                ratio = ratio / 100;
                var result = ratio * commodity.quantity * commodity.currentPrice;
                result = Math.round(result * 100) / 100;
                return result;
            }

            function checkVolume(volume) {
                if (shipOperator.haveVolume($scope.ship, volume)){
                    $scope.volumeExceeded = false;
                }
                else {
                    $scope.volumeExceeded = true;
                }
            }

            function checkPrice(price) {
                if (player.haveMoney(price)){
                    $scope.priceExceeded = false;
                }
                else {
                    $scope.priceExceeded = true;
                }
            }
        }
    }
}