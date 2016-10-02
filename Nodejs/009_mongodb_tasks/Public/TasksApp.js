var usersTasksApp = angular.module('usersTasksApp', ['ngRoute']);

angular
    .module('usersTasksApp')
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
                 when('/tasks/:taskId', {
                     templateUrl: 'src/Tasks/TaskEdit/taskEdit.html',
                     controller: 'TaskEditCtrl as vm'
                 }). 
                 when('/users/:taskId', {
                     templateUrl: 'src/Users/UserEdit/useredit.html',
                     controller: 'UserEditCtrl as vm'
                 }).                 
                 otherwise({
                     redirectTo: '/tasks'
                 });
             }
            ]);