var myAppController = angular.module('myApp', []);
var mydata;
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
    $http.get('/api/animals').success(function(data, status, headers, config) {
        $scope.animals = data;
        mydata = data;
    }).error(function(data, status, headers, config) {
        console.log("error!");
    });
});

myAppController.controller('DetailAnimal', function($scope, $routeParams) {
    $scope.animal = mydata[$routeParams.id];
});
