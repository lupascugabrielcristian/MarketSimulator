angular.module('app').directive('shipDetails', shipDetails);

function shipDetails($rootScope, events) {

    return {
        restrict: 'AE',
        templateUrl: '/parts/shipDetails.html',
        scope: {
            point: '='
        },
        link: function($scope) {
            $scope.test = "Test ok"
        },
        controller: function($scope) {
            $scope.close = function() {
                $rootScope.$broadcast(events.pointClicked, null);
            };
        }
    }
}