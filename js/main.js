require.config({

    baseUrl: "../js",
    
	// alias libraries paths
    paths: {
        'angular': 'lib/angular/angular',
        'angular-route': 'lib/angular/angular-route',
        'async': 'lib/requirejs/async',
        'angularAMD': 'lib/requirejs/angularAMD',
        'ngload': 'lib/requirejs/ngload',

        'MovieController': 'app/controllers/movie_ctrl',
        'ShopController': 'app/controllers/shop_ctrl',
        'AboutController': 'app/controllers/about_ctrl',
        'HomeController': 'app/controllers/home_ctrl',

        'ShopService': 'app/services/shop_service',
        'MovieService': 'app/services/movie_service'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    // kick start application
    deps: ['app']
});