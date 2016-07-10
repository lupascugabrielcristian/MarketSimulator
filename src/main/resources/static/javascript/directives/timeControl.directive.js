angular.module('app').directive('timeControl', timeControl);
function timeControl(timeService, events) {
    return {
        restrict: 'AE',
        templateUrl: '/parts/timeControl.html',
        link: function() {

        },
        controller: function($scope) {
            $scope.dayNumber = timeService.getDayNumber();

            $scope.play = function() {
                timeService.start();
            };

            $scope.stop = function() {
                timeService.stop();
            };


            $scope.$on(events.nextDay, function(event, args){
                $scope.dayNumber = args;
            });
        }
    }
}