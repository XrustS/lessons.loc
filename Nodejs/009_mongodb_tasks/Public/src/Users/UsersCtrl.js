
usersTasks.controller('UsersCtrl', function(TasksService) {

    var vm = this;
    // Выводим всех пользователей
    function refreshUsers() {
        TasksService.getUsers()
            .success((data) => {
            vm.users = data;
        })
    };
    refreshUsers();

    vm.showMessage = false;
    vm.ok = false;

    vm.deleteUser = function(id)  {
        TasksService.deleteUser(id)
            .then( function successCallback(resp){
            vm.ok = true;
            vm.showMessage = true;
            vm.message = `Пользователь: ${id} успешно удален.`;            
        }, 
                  function errorCallback(resp){
            vm.ok = false;
            vm.showMessage = true;
            vm.message = `Произошла ошибка удаления.`;
        });  
        
        setTimeout(() => {
            vm.showMessage = false;
            vm.ok = false; 
            console.log('Таймоут сработал ;)')
        }, 100);
        
        refreshUsers();        
    };

    vm.newUser = {};
    vm.addUser = function (user){
        TasksService.addUser(user)
            .then( function successCallback(resp){
            console.log(resp);
            vm.newUser = {};
            refreshUsers();
        });
    };


});