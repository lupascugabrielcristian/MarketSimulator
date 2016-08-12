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
            $scope.test = "OK";
            $scope.visibility = true;

            $scope.$on(events.modal, function(event, args){
                if (args.id != $scope.id) return;

                $scope.visibility = !$scope.visibility;
                console.log(args.commodity);
                console.log(args.ship);
            });
        }
    }
}