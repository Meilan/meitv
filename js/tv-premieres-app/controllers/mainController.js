var meilanTVControllers = angular.module('meilanTVControllers', []);


meilanTVControllers.controller('ShopCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
	
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

meilanTVControllers.controller('AboutCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.about = $routeParams;
    console.log("This is about page");
}]);

meilanTVControllers.controller('mainController', ['$scope', '$http',
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


		//$scope.apiUrl = 'http://api.trakt.tv/movies/trending.json/' + $scope.apiKey + '?&callback=JSON_CALLBACK';
		$scope.apiUrl = 'http://meitv.dev/data/data.json?callback=JSON_CALLBACK';

		$scope.init = function() {
			//user "jsonp" instead of get when it is cross domain fetching
			$http.get($scope.apiUrl).success(function(data){
				angular.forEach(data, function(value, index) {
					//Conver normal youtube video url into embed url
					var trailerUrl = value.trailer;
					trailerUrl = trailerUrl.replace('watch?v=', 'embed/');
					value.trailerUrl = trailerUrl;

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
}]);


/*
meilanTVControllers.controller("mainController", function($scope, $http){

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


	$scope.apiUrl = 'http://api.trakt.tv/movies/trending.json/' + $scope.apiKey + '?&callback=JSON_CALLBACK';

	$scope.init = function() {
		$http.jsonp($scope.apiUrl).success(function(data){
			angular.forEach(data, function(value, index) {
				
				//Conver normal youtube video url into embed url
				var trailerUrl = value.trailer;
				trailerUrl = trailerUrl.replace('watch?v=', 'embed/');
				value.trailerUrl = trailerUrl;

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
		}).error(function(error){ });
	};

	$scope.numberOfPages = function() {
		console.log($scope.results.length);
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

});
*/

//Pagination start point
app.filter('startFrom', function() {

	//"input" Source array or string to be limited. In this app, all the movies.
    return function(input, start) {

		//Set body ontop after reset page

        start = +start; //parse to int
        return input.slice(start);

    };
});

app.filter('isGenre', function() {
    return function(input, genre) {
        if (typeof genre === 'undefined' || genre === null) {
            return input;
        } else {
            var out = [];
            for (var a = 0; a < input.length; a++){
                for (var b = 0; b < input[a].genres.length; b++){
                    if(input[a].genres[b] == genre) {
                        out.push(input[a]);
                    }
                }
            }
            var numberOfPages = Math.ceil(out.length/10);
            return out;
        }
    };
});