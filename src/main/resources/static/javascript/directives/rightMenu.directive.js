angular.module('app').directive('rightMenu', rightMenu);
angular.module('app').service('rightMenuService', rightMenuService);

rightMenu.$inject = ['$rootScope', 'events'];

function rightMenuService($rootScope, events) {
    var options = [];

    return {
        addOption: addOption,
        removeOption: removeOption,
        haveOption: haveOption
    };

    function addOption(optionName, callback) {
        if (findOptionWithName(optionName)) {
            console.log("Cannot add option " + optionName + " because was found already");
            return;
        }

        options.push(new Option(optionName, callback));
        $rootScope.$broadcast(events.rightMenuAddOptionEvent, options);
    }

    function removeOption(option) {
        var indexToDelete = findOptionWithName(option.title).index;
        options.splice(indexToDelete, 1);
        $rootScope.$broadcast(events.rightMenuAddOptionEvent, options);
    }

    function haveOption(optionName){
        return findOptionWithName(optionName) != 0;
    }

    function findOptionWithName(optionName) {
        for (var option in options) {
            if (option.title == optionName){
                return {
                    option: option,
                    index: options.indexOf(option)
                };
            }
        }
        return 0;
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

            // $scope.$on(events.rightMenuAddOptionEvent, function(event, arguments){
            //    addOption(arguments.data.title, arguments.data.callback);
            // });
            //
            //
            // $scope.$on(events.rightMenuRemoveOptionEvent, function(event, arguments){
            //     removeOption(arguments.data);
            // });

            function addOption(optionName, callback) {
                // if (findOptionWithName(optionName)) {
                //     console.log("Cannot add option " + optionName + " because was found already");
                //     return;
                // }
                //
                // $scope.options.push(new Option(optionName, callback));
            }

            function removeOption(option) {
                // var indexToDelete = findOptionWithName(option.title).index;
                // $scope.options.splice(indexToDelete, 1);
            }

            $scope.$on(events.rightMenuAddOptionEvent, function(event, arguements){
                console.log("Updating options in directive");
                $scope.options = arguements.data;
            });

            // function findOptionWithName(optionName) {
            //     for (var option in $scope.options) {
            //         if (option.title == optionName){
            //             return {
            //                 option: option,
            //                 index: $scope.options.indexOf(option)
            //             };
            //         }
            //     }
            //     return 0;
            // }
        }
    };

    function makeAddOperation() {

    }

    function Option(title, callback){
        this.title = title;
        this.callback = callback;
    }
}