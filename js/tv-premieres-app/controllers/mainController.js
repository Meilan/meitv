var appControllers = angular.module('controllers', []);


// Function for generating valid url
var generateUrl = function(pre, tail) {
	var convertedUrl = pre.replace(/[\. ,:-]+/g, "-") + '-' + tail;
	return convertedUrl;
};

appControllers.controller('ShopCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {

	$scope.init = function() {
		$('nav li').removeClass('active');
        $('li.shop').addClass('active');
	};
	
	$scope.dvds = [
		{
			name: 'Batman',
			price: 299,
			active: true
		},{
			name: 'Spiderman',
			price: 199,
			active: false
		},{
			name: 'Superman',
			price: 99,
			active: false
		},{
			name: 'Ironman',
			price: 9,
			active: false
		}
	];

	$scope.toggleActive = function(d){
		d.active = !d.active;
	};

	$scope.total = function() {
		var total = 0;
		angular.forEach($scope.dvds, function(d) {
			if(d.active){
				total += d.price;
			}
		});
		return total;
	};
}]);

appControllers.controller('AboutCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.about = $routeParams;
   $scope.init = function() {
		$('nav li').removeClass('active');
        $('li.about').addClass('active');
    };
}]);

appControllers.controller('MovieCtrl', ['$scope', '$http',
	function($scope, $http) {

		$scope.apiKey = "1c60bfaa49ab8a58b42043418a9cc049";
		//$scope.searchQuery = "good";
		$scope.filterText = null;
		$scope.results = [];

		$scope.itemsPerPage = 10;
		$scope.currentPage = 0;

		$scope.availableGenres = [];
		$scope.genreFilter = null;

		$scope.orderFields = [ "Year", "Rating"];
		$scope.orderDirections = ["Descending", "Ascending"];
		$scope.orderField = "Year"; //Default order field
		$scope.orderReverse = false;

		$scope.embedTrailer = null;



		//$scope.apiUrl = 'http://api.trakt.tv/movies/trending.json/' + $scope.apiKey + '?&callback=JSON_CALLBACK';
		$scope.apiUrl = 'http://meitv.dev/data/data.json?callback=JSON_CALLBACK';
		$scope.statsUrl = 'http://api.trakt.tv/movie/stats.json/'+ $scope.apiKey;

		$scope.init = function() {

			$('nav li').removeClass('active');
			$('li.movies').addClass('active');
			//user "jsonp" instead of get when it is cross domain fetching
			$http.get($scope.apiUrl).success(function(data){
				angular.forEach(data, function(value, index) {
					
					angular.forEach(value.genres, function(genre, index) {
						var exists = false;
						angular.forEach($scope.availableGenres, function(avGerne, index) {
							if(avGerne == genre){
								exists = true;
							}
						});
						if(exists === false) {
							$scope.availableGenres.push(genre);
						}
					});
					$scope.results.push(value);

				});
			}).error(function(error){
				console.log('error' + error);
			});
		};

		$scope.numberOfPages = function() {
			console.log("Return " + $scope.results.length + "items");
			return Math.ceil($scope.results.length/$scope.itemsPerPage);
		};

		$scope.setGenreFilter = function(genre) {
			$scope.genreFilter = genre;
		};

		$scope.customOrder = function(movie) {
			switch ($scope.orderField) {
			case "Year":
				return movie.year;
				break;
			case "Rating":
				return movie.ratings.percentage;
				break;
			}
		};

		$scope.showStats = function(movie) {
			var movieUrl = generateUrl(movie.title, movie.year);
			var statsUrl = $scope.statsUrl + '/' + movieUrl + '?&callback=JSON_CALLBACK';

			$http.jsonp(statsUrl).success(function(data){
				//console.log(data);
			});
		};

		$scope.showTrailer = function(movie) {
			//Conver normal youtube video url into embed url
			var trailerUrl = movie.trailer.replace('watch?v=', 'embed/');
			$scope.embedTrailer = trailerUrl;
			var newElement = angular.element("<iframe width='560' height='315' src="+$scope.embedTrailer+" frameborder='0' allowfullscreen></iframe><hr>");
			$('#'+ movie.imdb_id).html(newElement);

			$('#'+ movie.imdb_id).modal({
				keyboard: true
			});
		};
}]);