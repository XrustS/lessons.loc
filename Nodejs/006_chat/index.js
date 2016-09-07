'use strict'; 

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.argv[2] || 3333;

server.listen(port);
console.log('Start application on port %d', port);

let users ={},
    rooms = ['cars', 'dogs&cats', 'geeks'];

app.get('/', (req, resp) => {
    resp.sendFile(__dirname+'/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('newuser', (username) => {
        socket.name =  username;
        socket.room = rooms[0];
        users['username'] = username;
        users.rooms = rooms[0];
        console.log('New user %s connect!', username);
    });
    
    socket.on('change room', (room) => {
        if(!rooms.find(room))
            return console.log('%s give fake room %s', socket.name, room);
            
        socket.leave(socket.room);
        socket.broadcast.to(socket.room).emit('sendMessage', 'Пользователь:'+socket.name+' покидает группу');
        socket.room = room;
        socket.join(room);
        socket.broadcast.to(socket.room).emit('sendMessage', 'Пользователь:'+socket.name+' вступает в группу');
    });



    socket.to(socket.room).broadcast.emit('sendMessage', 'В чате новый пользователь '+socket.name+'!');

    socket.on('disconnect', () => {

        console.log('user %s disconnected', socket.name);
    });

    socket.on('sendMessage', (msg) => {
        console.log('name:%s room:%s %s',socket.name, socket.room, msg);
        io.to(socket.room).emit('sendMessage', socket.name+': '+msg);        
    });


});


