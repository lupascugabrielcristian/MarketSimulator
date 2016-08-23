angular.module('app').directive('commodityEdit', commodityEdit);

function commodityEdit(dataCalls, events, $rootScope) {
    return {
        restrict: 'AE',
        templateUrl: '/parts/commodityEdit.html',
        link: function() {

        },
        controller: function($scope){
            $scope.cancel = function(){
                $scope.editCommodityModalVisible = false;
            };

            $scope.save = function() {
                $scope.editCommodityModalVisible = false;
                var saveResult = dataCalls.saveCommodity($scope.commodityForEdit);
                saveResult.then(function(result){
                    if(result.data){
                        $scope.selectedCommodity = $scope.commodityForEdit;
                        // sa trimit un mesaj sa se updateze commodities manager
                    }
                    else {
                        $rootScope.$broadcast(events.alert, "Save procedure was not completed");
                    }
                });
            };
        }
    }
}