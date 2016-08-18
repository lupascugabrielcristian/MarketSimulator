angular.module('app').directive('alert', alert);

function alert(events) {
  return {
    restrict: 'AE',
    templateUrl:'/parts/alert.html',
    link : function(){

    },
    controller: function($scope) {
      $scope.isShown = false;
      $scope.message = "Test OK";

      $scope.close = function() {
        $scope.isShown = false;
      };

      $scope.$on(events.alert, function(event, message){
        $scope.message = message;
        $scope.isShown = true;
      });
    }
  }
}
