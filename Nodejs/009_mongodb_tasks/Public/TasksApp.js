var usersTasks = angular.module('usersTasks', ['ngRoute']);

angular
    .module('usersTasks')
    .config(['$routeProvider',
             function config($routeProvider) {

                 $routeProvider.
                 when('/users', {
                     templateUrl: 'src/Users/users.html',
                     controller: 'UsersCtrl as vm'
                 }).
                 when('/tasks', {
                     templateUrl: 'src/Tasks/tasks.html',
                     controller: 'TasksCtrl as vm'
                 }).
                 when('/', {
                     templateUrl: 'src/Main/main.html',
                     controller: 'MainCtrl as vm'
                 }).        
                 otherwise({
                     redirectTo: '/'
                 });
             }
            ]);