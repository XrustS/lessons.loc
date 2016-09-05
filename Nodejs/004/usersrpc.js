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
    /*update(req, resp, idUser, odjUser){
        let user = {},
            iduser = idUser !== undefined ? iduser : this.parseUrl(req);

        if(odjUser === undefined){
            if(req.body.name) user.name = req.body.name;
            if(req.body.score) user.score = req.body.score;
        } else { user = odjUser };

        if(!Object.keys(user).length)
            return resp.status(400).json({ error: `Bad request. Don\`t send parametrs` });    

        this.db.update({ _id: +iduser },  user, {}, (err, numUpdate) => {
            if(!numUpdate)
                return resp.status(400).json({ error: `user ${iduser} not Found` });
            resp.json({ success: `user ${iduser} updating` });
        });   
    }
    delete(req, resp, idUser){
        let userId = idUser !== undefined ? idUser : this.parseUrl(req);;

        this.db.remove({ _id: +userId }, {}, (err, numRemoved) => {
            if(!numRemoved)
                return resp.json({ error: `user ${userId} not Found` });
            resp.json({ success: `user ${userId} delete` }); 
        })
    }*/
    _getLastIndex(db){
        return new Promise ((resolve, reject) => {
            this.db.find({}).sort({ _id: -1 }).limit(1).exec( (err, docs) =>{
                if(err)
                    return reject(err);            

                resolve((docs.length === 0) ? 0: Number(docs[0]._id));            
            })

        })
    }
    parseUrl(req){
        return req.path.split('/')[1]
    }
}