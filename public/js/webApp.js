/// <reference path="https://code.angularjs.org/1.5.0/angular.js" />

var utils = {
    'guid': function () {
        function uuid () {
            return Math.floor((1 + Math.random()) * 0x10000)
                                       .toString(20)
                                       .substring(1)
        }
        return (uuid() + uuid() + uuid() + uuid()).substring(0, 10)
    },
    'hash': undefined
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
    
})

myMindsApp.controller('noteController', function ($scope, $location, $routeParams, $http) {

    if ($location.path() === '/note/') {
        utils.hash = utils.guid()
        $location.path('/note/' + utils.hash)
    } else {
        var hash = $routeParams.hash || ''
        if (!(hash.length === 10)) {
            utils.hash = utils.guid()
            $location.path('/note/' + utils.hash)
        } else {
            var request = { 
                method: 'GET', 
                url: 'http://localhost:9000/v1/note/' + $routeParams.hash
            }
            
            $http(request).then(function (data) {
                $scope.note = data.data.data.tt_note
            }, function (err) {
                console.log(err)  
            })
        }
    }

    $scope.typing = function () {
        var request = { 
            method: 'POST', 
            url: 'http://localhost:9000/v1/note' ,
            data: {
                hash: utils.hash,
                note: $scope.note
            }
        }
        
        $http(request).then(function (data) {
            console.log(data)
        }, function (err) {
            console.log(err)
        })
    }
})
