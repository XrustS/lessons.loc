var usersTask = angular.module('usersTask', []);

usersTask.controller('usersContrl', function($scope) {
    $scope.users = [
        {
            "_id": "57e804dd07f2ac9f81d00958",
            "firstName": "Alex",
            "lastName": "Craft",
            "update": "2016-09-26T18:33:51.316Z"
        },
        {
            "_id": "57e8bd915b1b3a684625ec32",
            "firstName": "Pite",
            "lastName": "Die",
            "update": "2016-09-26T18:33:51.320Z"
        },
        {
            "_id": "57e8f3d15b1b3a684625ec34",
            "firstName": "Den",
            "lastName": "Wachowsky",
            "update": "2016-09-26T18:33:51.321Z"
        }
    ];

    $scope.tasks = [
        {
            "_id": "57e805e95b1b3a684625ec31",
            "taskName": "First task",
            "status": "Open",
            "dateCreate": "timestamp",
            "dateCloseTask": "timestamp",
            "key": [
                "57e8bd915b1b3a684625ec32"
            ],
            "update": "2016-09-26T18:59:05.814Z",
            "usersid": []
        },
        {
            "_id": "57e8bdc65b1b3a684625ec33",
            "taskName": "Second task",
            "status": "Close",
            "dateCreate": "timestamp",
            "dateCloseTask": "timestamp",
            "key": [
                "57e804dd07f2ac9f81d00958",
                "57e8bd915b1b3a684625ec32"
            ],
            "update": "2016-09-26T18:59:05.818Z",
            "usersid": []
        },
        {
            "_id": "57e8f4695b1b3a684625ec35",
            "taskName": "3",
            "status": "Close",
            "key": [
                "57e8bd915b1b3a684625ec32"
            ],
            "update": "2016-09-26T18:59:05.819Z",
            "usersid": []
        },
        {
            "_id": "57e8f4715b1b3a684625ec36",
            "taskName": "4",
            "status": "Close",
            "key": [
                "57e8bd915b1b3a684625ec32"
            ],
            "update": "2016-09-26T18:59:05.819Z",
            "usersid": []
        },
        {
            "_id": "57e8f4765b1b3a684625ec37",
            "taskName": "5",
            "status": "Close",
            "key": [
                "57e8bd915b1b3a684625ec32"
            ],
            "update": "2016-09-26T18:59:05.819Z",
            "usersid": []
        }
    ]
})