(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        
        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            .state('album', {
                url: '/album',
                controller: 'AlbumCtrl as album',
                templateUrl: '/templates/album'
            })
            .state('collection', {
                url: '/collection',
                controller: 'ControllerCtrl as collection',
                templateUrl: '/templates/collection'
        });
    };
    
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();