/*
var app = angular.module('MeilanTV',[
	'ngRoute',
	'controllers',
	'filters'
]);
// configure html5 to get links working on jsfiddle
//$locationProvider.html5Mode(true);

app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
			when('/movies', {
				templateUrl: 'page/movies.html',
				controller: 'MovieCtrl'
			}).
			when('/shop', {
				templateUrl: 'page/shop.html',
				controller: 'ShopCtrl'
			}).
			when('/about', {
				templateUrl: 'page/about.html',
				controller: 'AboutCtrl'
			}).
			otherwise({
				redirectTo: '/movies'
			});
	}]);
*/
define(['angularAMD', 'angular-route'], function (angularAMD) {
    var app = angular.module("webapp", ['ngRoute']);
    
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
			when("/home",
				angularAMD.route({
					templateUrl: 'views/home.html',
					controller: 'HomeController'
            })).
            when("/movies",
				angularAMD.route({
					templateUrl: 'views/movies.html',
					controller: 'MovieController'
            })).
            when("/shop",
					angularAMD.route({
					templateUrl: 'views/shop.html',
					controller: 'ShopController'
			})).
			when("/about",
					angularAMD.route({
					templateUrl: 'views/about.html',
					controller: 'AboutController'
			})).
			otherwise({redirectTo: '/movies'});
    }]);

     // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);

    return app;
});