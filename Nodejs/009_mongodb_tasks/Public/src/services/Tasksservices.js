angular
    .module('usersTasks')
    .factory('TasksService', function($http) {

    return {                

        
        getUsers: function(){
             return $http.get('/api/v1.0/users')
        },
        getTasks: () => {
             return $http.get('/api/v1.0/tasks')
        },
        addUser: (newUser) => {
            return $http.post('/api/v1.0/users', newUser)
        },
        deleteUser: (userId) => {
            return $http.delete('/api/v1.0/users/'+userId)
        }
        
    }

});