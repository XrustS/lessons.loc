usersTasks.controller('TasksCtrl', function(TasksService) {
    var vm = this;

    let getTasks = () => {
        TasksService.getTasks()
            .then((resp) => {
            vm.tasks = resp.data;
            console.log(resp.data);
            return TasksService.getUsers()
        }).
        then((resp) => {
            console.log(resp.data);
            vm.users = resp.data;
            mergeUsersTasks(vm.tasks, vm.users);
            console.log(vm.tasks);
        })
    };    
    getTasks();
    
    function mergeUsersTasks(tasks, users){
        tasks.forEach((task) => {
            task.usersId.forEach( (userid, i) => {
                task.usersId[i] = getUser(userid, users)
            })
        })
        console.log('Массив Tasks преобразован!');
    }


    function getUser(id, users){
        return users.find( (item) => {
            return item._id === id
        })
    }
    // Фильтры
    vm.filterByUser = 'userName';

})