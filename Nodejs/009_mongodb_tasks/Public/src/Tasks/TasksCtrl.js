usersTasksApp.controller('TasksCtrl', function(TasksService) {
    var vm = this;
    vm.newTask = {usersId: ['false'] };

    let getTasks = () => {
        TasksService.getTasks()
            .then((resp) => {
            vm.tasks = resp.data;
            return TasksService.getUsers()
        }).
        then((resp) => {            
            vm.users = resp.data;
            mergeUsersTasks(vm.tasks, vm.users);
            return TasksService.getAggData()
        })
        .then((resp) => {
          vm.usersAggData = resp.data;  
        })
    };    
    getTasks();
    
    function mergeUsersTasks(tasks, users){
        tasks.forEach((task) => {
            task.usersId.forEach( (userid, i) => {
                task.usersId[i] = _getUser(userid, users)
            })
        })
        console.log('Массив Tasks преобразован!');
    };
    function _getUser(id, users){
        return users.find( (item) => {
            return item._id === id
        })
    };
    
    vm.addTask = (newTask) => {
        TasksService.addTask(newTask)
            .then(resp => success(resp) , 
            err => error(err));
        vm.newTask = {usersId: ['false'] };
        getTasks();
    }
    
    
    // Фильтры
    vm.filterByUser = 'userName';
    
    
    
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