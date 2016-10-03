angular.module('app').directive('rightMenu', rightMenu);
angular.module('app').service('rightMenuService', rightMenuService);

rightMenu.$inject = ['$rootScope', 'events'];

function rightMenuService($rootScope, events) {
    var options = [];

    return {
        addOption: addOption,
        removeOption: removeOption,
        haveOption: haveOption,
        clearOptions: clearOptions
    };

    function addOption(optionName, callback) {
        if (findOptionWithName(optionName).index != -1) {
            console.log("Cannot add option " + optionName + " because was found already");
            return;
        }

        options.push(new Option(optionName, callback));
        $rootScope.$broadcast(events.rightMenuAddOptionEvent, options);
    }

    function removeOption(optionName) {
        var indexToDelete = findOptionWithName(optionName).index;

        if (indexToDelete == -1){
            return;
        }

        options.splice(indexToDelete, 1);
        $rootScope.$broadcast(events.rightMenuAddOptionEvent, options);
    }

    function haveOption(optionName){
        return findOptionWithName(optionName) != 0;
    }

    function clearOptions() {
        options = [];
        $rootScope.$broadcast(events.rightMenuAddOptionEvent, []);
    }

    function findOptionWithName(optionName) {
        try {
            options.forEach(function (option) {
                if (option.title == optionName) {
                    throw option;
                }
            });
        }
        catch (optionFound) {
            return {
                found: true,
                option: optionFound,
                index: options.indexOf(optionFound)
            };
        }

        return {
            found: false,
            option: "None",
            index: -1
        };
    }

    function Option(title, callback){
        this.title = title;
        this.callback = callback;
    }
}

function rightMenu($rootScope, events, rightMenuService){
    return {
        restrict: 'AE',
        templateUrl: '/parts/rightMenu.html',
        link: function() {

        },
        controller : function($scope){
            $scope.options = [];

            $scope.$on(events.rightMenuAddOptionEvent, function(event, arguments){
                $scope.options = arguments;
            });
        }
    };

    function Option(title, callback){
        this.title = title;
        this.callback = callback;
    }
}