var appFilters = angular.module('filters', []);


//Pagination start point
appFilters.filter('startFrom', function() {

	//"input" Source array or string to be limited. In this app, all the movies.
    return function(input, start) {

		//Set body ontop after reset page

        start = +start; //parse to int
        return input.slice(start);

    };
});

appFilters.filter('isGenre', function() {
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