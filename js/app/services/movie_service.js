define(['app'], function (app) {
    app.register.factory('Movies', ['$http', '$q', '$log', function ($http, $q, $log) {
      
        var apiKey = "1c60bfaa49ab8a58b42043418a9cc049";
        //var apiUrl = 'http://api.trakt.tv/movies/trending.json/' + $scope.apiKey + '?&callback=JSON_CALLBACK';
        var apiUrl = 'http://meitv.dev/data/data.json?callback=JSON_CALLBACK';
        return {
            query: function () {
                var d = $q.defer();

                //User jsonp instead get when fetching remove data
                $http.get(apiUrl).success(function (data) {
                    d.resolve(data);
                }).error(function (data, status, headers, config) {
                    $log.error("Error: ", headers);
                    d.reject(data);
                });
                return d.promise;
            }
        };

    }]);

});