angular.module('app').directive('message', message);

function message(events, $timeout) {
    return {
        restrict: 'AE',
        templateUrl: "/parts/message.html",
        link :function() {

        },
        controller: function($scope) {
            $scope.message = "";

            $scope.$on(events.message, function(event, args){
                $scope.message = args.message;
                $timeout(function(){
                    $scope.message = "";
                }, 2500);

            });
        }
    }
}