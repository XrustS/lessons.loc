'use strict';

const Datastore = require('nedb');

module.exports = class Users {
    constructor(options){


    }
    show(idUser, db, callback){
        let iduser = idUser ;

        db.find(iduser, (err, docs) => {
            if(err)  
                return callback(err);
            callback(null, docs)
        })            
    }
    insert(User, db, callback){         
        let user = User;

        db.find({}).sort({ _id: -1 }).limit(1).exec( (err, docs) =>{
            console.log(docs);
            user._id = ++docs[0]._id;
            db.insert(user, (err, numDoc) => {
                if(err)
                    return callback(err);        
                callback(null, numDoc)
            })
        })
    }
    update(data, db, callback){
        let objUser = data;
        
        if(objUser._id === undefined)
            return callback('Bad request!');
        
        db.update({ _id: +objUser._id},  objUser, {}, (err, numUpdate) => {
            if(err)
                return callback(err);
            callback(null, { success: `user ${numUpdate} updating`});
        });   
    }
    delete(idUser, db, callback){
        if(idUser._id === undefined)
            return callback(new Error('Bad request!'));
        db.remove({ _id: +idUser._id }, {}, (err, numRemoved) => {
            if(!numRemoved)
                return callback(`user ${idUser._id} not Found` );
           callback(null, { success: `user ${idUser._id} delete` }); 
        })
    }
}