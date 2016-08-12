angular.module('app').directive('buyPartially', buyPartially);

function buyPartially(){
    return {
        restrict: 'AE',
        scope: true,
        templateUrl: '/parts/buyPartially.html',
        link: function() {

        },
        controller: function ($scope, events){
            $scope.id = "buy_partially_directive";
            $scope.visibility = true;
            $scope.ratio = 0;
            $scope.necessaryVolume = 0;
            $scope.necessaryMoney = 0;

            $scope.increaseRatio = function() {

            };

            $scope.decreaseRatio = function() {

            };

            $scope.buy =function() {

            };

            $scope.cancel = function() {

            };

            $scope.$on(events.modal, function(event, args){
                if (args.id != $scope.id) return;

                $scope.visibility = !$scope.visibility;
                console.log(args.commodity);
                console.log(args.ship);
            });
        }
    }
}