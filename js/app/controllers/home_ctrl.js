define(['app'], function (app) {
    app.register.controller('HomeController', function ($scope) {
        $scope.message = "Message from HomeCtrl";
        console.log('what');
    });
});