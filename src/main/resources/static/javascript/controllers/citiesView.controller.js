angular.module('app').controller('citiesViewController', citiesViewController);

function citiesViewController($scope, citiesManager, rightMenuService) {
    $scope.detailsVisible = false;
    $scope.factoriesVisible = false;
    $scope.commoditiesVisible = false;

    $scope.allCities = citiesManager.getCities();
    $scope.showCity = function(city) {
        $scope.selectedCity = city
    };

    $scope.editSelectedCity = function() {
        rightMenuService.addOption(Options.FINISH);
    };

    $scope.finishEdit = function() {
        rightMenuService.removeOption(Options.FINISH);
    };

    $scope.haveOption = function(optionName) {
        rightMenuService.haveOption(optionName);
    };

    $scope.updateOptions = function() {
        if ($scope.detailsVisible) {
            rightMenuService.addOption(Options.DETAILS)
        }
        else {
            rightMenuService.removeOption(Options.DETAILS);
        }

        if ($scope.factoriesVisible){
            rightMenuService.addOption(Options.FACTORIES);
        }
        else {
            rightMenuService.removeOption(Options.FACTORIES);
        }

        if ($scope.commoditiesVisible) {
            rightMenuService.addOption(Options.COMMODITIES);
        }
        else {
            rightMenuService.removeOption(Options.COMMODITIES);
        }
    };

    function Options() {
    }
    Options.FINISH = "finish";
    Options.DETAILS = "details";
    Options.FACTORIES = "factories";
    Options.COMMODITIES = "commodities";

}