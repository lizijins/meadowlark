var myAppController = angular.module('myApp', []);
var animals;
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

myAppController.controller('ListAnimal', function($scope, $http) {
    if(animals) {
        $scope.animals = animals;
    } else {
        $http.get('/api/animals').success(function(data, status, headers, config) {
            $scope.animals = data;
            animals = data;
        }).error(function(data, status, headers, config) {
            console.log("error!");
        });
    }
});

myAppController.controller('DetailAnimal', function($scope, $http, $routeParams) {
    if(animals) {
        $scope.animal = animals[parseInt($routeParams.id) - 1];
    } else {
        $http.get('/api/animals').success(function(data, status, headers, config) {
            animals = data;
            $scope.animal = animals[parseInt($routeParams.id) - 1];
        }).error(function(data, status, headers, config) {
            console.log("error!");
        });
    }
});
