define(['app'], function(app){
	app.register.controller('ShopController', function($scope) {
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
});

});