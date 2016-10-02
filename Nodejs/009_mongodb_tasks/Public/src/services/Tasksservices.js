angular
    .module('usersTasksApp')
    .factory('TasksService', function($http) {

    return {                

        
        getUsers: () => {
             return $http.get('/api/v1.0/users')
        },
        getUser: (userId) => {
            return $http.get('/api/v1.0/users/'+userId)
        },
        getTask: (taskId) =>{
            return $http.get('/api/v1.0/tasks/'+taskId)
        },
        getTasks: () => {
             return $http.get('/api/v1.0/tasks')
        },
        updateTask: (updateTask) =>{
            return $http({
                url: '/api/v1.0/tasks/'+ updateTask._id,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: updateTask
            })
        },
        updateUser: (updateUser) => {
            return $http({
                url: '/api/v1.0/users/'+ updateUser._id,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: updateUser
            })
        },
        addUser: (newUser) => {
            return $http.post('/api/v1.0/users', newUser)
        },
        addTask: (newTask) => {
            return $http.post('/api/v1.0/tasks', newTask)
        },
        deleteUser: (userId) => {
            return $http.delete('/api/v1.0/users/'+userId)
        },
        deleteTask: (taskId) => {
            return $http.delete('/api/v1.0/tasks/'+taskId)
        },
        getAggData: () => {
            return $http.get('/api/v1.0/aggregate')
        }
        
    }

});