var myAppService = angular.module('Service', []);

myAppService.factory('Animals', function() {
   var animals = {};
    animals.query = function() {
        return [{url: 'animal-1.svg', word: "狮子"},
            {url: 'animal-1.svg', word: "老虎"},
            {url: 'animal-1.svg', word: "熊猫"}];
    };
    return animals;
});