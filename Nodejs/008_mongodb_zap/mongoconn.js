'use strict';
const Mongoconn = require('mongodb').MongoClient,
      ObjectId = require('mongodb').ObjectId;


module.exports = function mongoconn(urL, collectioN){
    let url = urL || 'mongodb://localhost:27017/users',
        collection = collectioN || 'users';

    mongoconn._conn = (callback) => {
        Mongoconn.connect(url, (err, db) => {
            if(err)
                return console.log(err);
            callback(db.collection(collection));
            db.close();           
        })
    };
    mongoconn.insert = (data, callback) => {
        mongoconn._conn((db) => {
            db.insert(data, (err, result) => {
                if(err)
                    return callback(err);
                callback(null, result);
            });             
        });
    };
    mongoconn.find = (query, callback) => {
        if(query._id !== undefined)
            query._id = new ObjectId(query._id);
        mongoconn._conn((db) => {
            db.find(query, (err, docs) => {
                return callback(docs);  
            })            
        }); 
    };
    mongoconn.update = (query, updata, opt, callback) => {
        mongoconn._conn((db) => {
            db.update(query, updata, opt) 
        });
    };
    mongoconn.delete = (query, callback) => {
        mongoconn._conn((db) => {
            db.deleteOne(query);
        });
    };
    return mongoconn;
};
/*let mc = mongoconn();
mc.find({}, (res) => {
    res.toArray()
        .then(response => console.log(response));

})*/