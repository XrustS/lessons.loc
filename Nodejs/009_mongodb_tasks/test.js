let users = [
    {
        "_id": "57ebfdc2ad451819c85e5702",
        "userName": "Алистрат Семенвич Губкин",
        "__v": 0,
        "update": "2016-09-28T17:28:34.478Z"
    },
    {
        "_id": "57ec3e1a2867723a188cd8c9",
        "userName": "Павел Петрович Бажов",
        "__v": 0,
        "update": "2016-09-28T22:03:06.541Z"
    },
    {
        "_id": "57ec42ea2867723a188cd8ca",
        "userName": "Михаил Сергеевич Петров",
        "__v": 0,
        "update": "2016-09-28T22:23:38.036Z"
    },
    {
        "_id": "57ec43fe2867723a188cd8cb",
        "userName": "Виниамин Петров-Водкин",
        "__v": 0,
        "update": "2016-09-28T22:28:14.131Z"
    }
],
    tasks = [
        {
            "_id": "57ec088967cf6c1eccd0d45b",
            "taskName": "Помыть ВСЕ без исключения окна",
            "__v": 0,
            "isClose": true,
            "update": "2016-09-28T18:14:33.359Z",
            "usersId": [
                "57ebfdc2ad451819c85e5702"
            ]
        },
        {
            "_id": "57ec08f65c8e782634f7ef6c",
            "taskName": "Помыть ВСЕ окна",
            "details": "Помыть все окна",
            "__v": 0,
            "userId": [],
            "isClose": false,
            "update": "2016-09-28T18:16:22.812Z",
            "usersId": [
                "57ebfdc2ad451819c85e5702",
                "57ebf853de7c9c2e5cb22396"
            ]
        }
    ];

function mergeUsersTasks(tasks, users){
    tasks.forEach((task) => {
        task.usersId.forEach( (userid, i) => {
            let user = getUser(userid, users);
            if(user)
                task.usersId[i] = user;
        })
    })
    console.log('Работа сделана!');
}


function getUser(id, users){
    return users.find( (item) => {
        return item._id === id
    })
}
console.log(getUser('57ebf853de7c9c2e5cb22396', users))
console.log(tasks)
mergeUsersTasks(tasks, users);
console.log(tasks)
