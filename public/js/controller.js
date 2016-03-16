var myAppController = angular.module('myApp', ['Service']);

myAppController.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            controller:'ListAnimal',
            templateUrl: '/view/list.html'
        }).

        when('/detail/:id', {
            controller: 'DetailAnimal',
            templateUrl: '/view/detail.html'
        }).
        otherwise({
           redirectTo: '/'
        });
}]);

myAppController.controller('ListAnimal', function($scope, Animals) {
    $scope.animals = Animals;
});

myAppController.controller('DetailAnimal', function($scope, $routeParams, Animals) {
    $scope.animal = Animals[$routeParams.id];
});
