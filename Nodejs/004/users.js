'use strict';

const Datastore = require('nedb');

module.exports = class Users {
    constructor(options){
        // установка первичных настрек, инициализация бд

        this.db =  options.db || new Datastore();
        this.lastIndex = 0;
        this._getLastIndex(this.db)
            .then(
            resp => {
                this.lastIndex = resp;
            })

    }
    show(req, resp, idUser){
        let iduser = (idUser !== undefined) ? { _id: +idUser } : {};

        this.db.find(iduser, (err, docs) => {
            resp.links({
                self: req.originalUrl            
            });
            resp.json(docs);        
            console.log(`Select ${docs.length} records`);
        })    
    }
    insert(req, resp){ 
        if(!req.body.name || !req.body.score)
            return resp.status(400).json({ error: `Bad request. Don\`t send parametrs` });
        let user = {
            _id: ++this.lastIndex,
            name: req.body.name,
            score: req.body.score
        };    

        this.db.insert(user, (err, numDoc) => {
            if(err)
                return console.log(err);        
            resp.status(201).json({ success:`Пользователь id: ${numDoc._id} name: ${numDoc.name} score: ${numDoc.score} успешно добавлен!` });
        })
    }
    update(req, resp, idUser, odjUser){
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
    }
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
