angular.module('app').directive('alert', alert);

function alert() {
  return {
    restrict: 'AE',
    templateUrl:'/parts/alert.html',
    link : function(){

    },
    controller: function($scope) {
      $scope.test = "Test OK"
    }
  }
}
