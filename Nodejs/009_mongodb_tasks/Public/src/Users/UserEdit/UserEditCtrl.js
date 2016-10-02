'use strict';

usersTasksApp.controller('UserEditCtrl', function($routeParams, TasksService) {
    let vm = this;
    
    TasksService.getUser($routeParams['taskId'])
        .success( (data) => {
        vm.userEdit=data[0]; 
       
    })

    vm.setUserUpdate = (userEditModel) =>{
        TasksService.updateUser(userEditModel)
            .then( 
            resp => success(resp), 
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
