angular.module('app').directive('cityDetails', cityDetails);

function cityDetails($rootScope, events) {

    return {
        restrict: 'AE',
        templateUrl: '/parts/cityDetails.html',
        scope: {
            point: '='
        },
        link: function($scope) {
        },
        controller: function($scope) {
            $scope.close = function() {
                $rootScope.$broadcast(events.pointClicked, null);
            };
        }
    }
}