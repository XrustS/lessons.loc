'use strict';

usersTasksApp.controller('TaskEditCtrl', function($routeParams, TasksService) {
    let vm = this;

    TasksService.getTask($routeParams['taskId'])
        .success( (data) => {
        vm.taskEdit=data[0];        
    })

    vm.setTaskUpdate = (taskEditModel) =>{
        TasksService.updateTask(taskEditModel)
            .then( 
            resp => success(resp) , 
            err => error(err))
    };

    vm.deleteTask = (taskId) => {
        TasksService.deleteTask(taskId)
            .then( resp => success(resp) , 
            err => error(err))                
    };

    function success(resp){
        vm.showMessage = true;
        vm.ok = true;
        vm.message = resp.data;
    };
    function error(resp){
        vm.showMessage = true;
        vm.ok = false;
        vm.message = 'Что-то пошло не так! '+resp.data;
    };
})
