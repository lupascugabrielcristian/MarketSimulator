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
        rightMenuService.clearOptions();

        if ($scope.detailsVisible) {
            rightMenuService.addOption("More")
        }

        if ($scope.factoriesVisible){
            rightMenuService.addOption("Add factory", addFactory);
            rightMenuService.addOption("Remove factory", removeFactory);
        }

        if ($scope.commoditiesVisible) {
            rightMenuService.addOption("Add commodity", addCommodity);
            rightMenuService.addOption("Remove commodity", removeCommodity);
        }
    };

    function showDetails() {
        console.log("Show details is not implemented");
    }

    function addFactory() {
        console.log("Add factory is not implemented");
    }

    function removeFactory() {
        console.log("Remove factory is not implemented");
    }

    function addCommodity() {
        console.log("Add commodity function is not implemented");
    }

    function removeCommodity() {
        console.log("Remove commodity function is not implemented");
    }

    function Options() {
    }
    Options.FINISH = "finish";
    Options.DETAILS = "Details";
    Options.FACTORIES = "Factories";
    Options.COMMODITIES = "Commodities";

}