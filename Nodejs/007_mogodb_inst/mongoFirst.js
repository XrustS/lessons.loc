'use strict';

const MongoClient = require('mongodb').MongoClient,
      url = 'mongodb://localhost:27017/testdb';

MongoClient.connect(url, (err, db) => {
    if(err)
        return console.log('Проблема при подключении к серверу бд %s', err);

    const coll = db.collection('users');
    let users = [{name: 'Сергей',
                  age: 22,
                  sex: 'male',
                 },
                 {name: 'Георгий',
                  age: 42,
                  sex: 'male',
                 },
                 {name: 'Дарья',
                  age: 78,
                  sex: 'fmale',
                 }];
    

    coll.insert(users, (err, result) => {
        if(err)
            return console.log('Ошибка при добавлении пользователя в бд %s',err);

    });
    coll.update({name: 'Дарья'}, {$set: {name: 'Маша'}});
    
    coll.find({}).forEach((docs) => {
            if(err)
                return console.log('Ошибка при выборке в бд %s',err);

            //console.log('-------------------BEGIN-FIND---------------------------');
            console.log('Пользователь: %s возраст %d', docs.name, docs.age);
            //console.log('---------------------END-FIND---------------------------');
        });
    // Чистим базу после наших тестов
    coll.deleteMany({});
    
    db.close();
})
