var myAppController = angular.module('myApp', ['Service']);

myAppController.controller('ListAnimal', function($scope, Animals) {
    $scope.animals = Animals.query();
});