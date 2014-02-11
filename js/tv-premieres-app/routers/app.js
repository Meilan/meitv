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
