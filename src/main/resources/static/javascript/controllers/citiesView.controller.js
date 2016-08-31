angular.module('app').controller('citiesViewController', citiesViewController);

function citiesViewController($scope, citiesManager) {
    $scope.detailsVisible = false;
    $scope.factoriesVisible = false;
    $scope.commoditiesVisible = false;

    $scope.allCities = citiesManager.getCities();
    $scope.showCity = function(city) {
        $scope.selectedCity = city
    };

    $scope.options = [];

    $scope.editSelectedCity = function() {
        $scope.options.push(Options.FINISH);
    };

    $scope.finishEdit = function() {
        removeOption(Options.FINISH);
    };

    $scope.haveOption = function(optionName) {
        return $scope.options.indexOf(optionName) != -1;
    };

    $scope.updateOptions = function() {
        if ($scope.detailsVisible) {
            addOption(Options.DETAILS);
        }
        else {
            removeOption(Options.DETAILS);
        }

        if ($scope.factoriesVisible){
            addOption(Options.FACTORIES);
        }
        else {
            removeOption(Options.FACTORIES);
        }

        if ($scope.commoditiesVisible) {
            addOption(Options.COMMODITIES);
        }
        else {
            removeOption(Options.COMMODITIES);
        }
    };

    function removeOption(optionName) {
        var index = $scope.options.indexOf(optionName);
        if (index != -1){
            $scope.options.splice(index, 1);
        }
    }

    function addOption(optionName) {
        var index = $scope.options.indexOf(optionName);
        if (index > -1){
            return
        }
        else {
            $scope.options.push(optionName);
        }
    }

    function Options() {
    }
    Options.FINISH = "finish";
    Options.DETAILS = "details";
    Options.FACTORIES = "factories";
    Options.COMMODITIES = "commodities";

}