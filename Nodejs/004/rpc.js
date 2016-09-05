const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const Users = require('./usersrpc');


const app = express();
const db = new Datastore({ filename: './users.db', autoload: true });

let users = new Users({db: db});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/rpc', function(req, res) {
    const method = users[req.body.method];
    const data = req.body;
    
    method(data.params, db, (err, result) => {
        if(err)
            return onError({
                code: -32603,
                message: 'Failed',
                data: err
            }, 500);

        res.send(JSON.stringify({
            jsonrpc: '2.0',
            result: result,
            error : null,
            id: data.id
        }), 200);


    });
    
    function onError(err, statusCode) {
        res.send(JSON.stringify({
            jsonrpc: '2.0',
            error: err,
            id: data.id
        }), statusCode);
    }
});

    // Only listen on $ node app.js
    if (!module.parent) {
        app.listen(3000);
        console.log("Express server listening on port %d", 3000)
    }