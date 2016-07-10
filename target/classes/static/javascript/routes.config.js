var routerApp = angular.module('app');

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            controller: 'mainViewController',
            templateUrl: '/stateViews/firstMenu.html'
        })
        
        .state('map', {
            url: '/map',
            controller:  'mapController',
            templateUrl: '/stateViews/map.html',
            resolve: {
                initialData: function(dataCalls, game) {
                    if (game.isLoaded){
                        return;
                    }
                    return dataCalls.initialize();
                }
            }
        });

});