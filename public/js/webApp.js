/// <reference path="https://code.angularjs.org/1.5.0/angular.js" />

var utils = {
    'guid': function () {
        function uuid() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(20)
                       .substring(1)
        }
        return (uuid() + uuid() + uuid() + uuid()).substring(0, 10)
    }
}

var myMindsApp = angular.module('myMindsApp', ['ngRoute'])

myMindsApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'homeController'
        })
        .when('/note/', {
            templateUrl: '/views/note.html',
            controller: 'noteController'
        })
        .when('/note/:hash/', {
            templateUrl: '/views/note.html',
            controller: 'noteController'
        })
        .otherwise({
            redirectTo: '/'
        })
})

myMindsApp.controller('homeController', function ($scope) {
    $scope.title = 'title'
})

myMindsApp.controller('noteController', function ($scope, $location, $routeParams) {
    if ($location.path() === '/note/') {
        $location.path('/note/' + utils.guid())
    } else {
        var hash = $routeParams.hash || ''
        if (!(hash.length === 10)) {
            $location.path('/note/' + utils.guid())
        }
    }
})