'use strict'; 

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.argv[2] || 3333;

server.listen(port);
console.log('Start application on port %d', port);

let users =[],
    rooms = ['cars', 'dogs&cats', 'geeks'];

app.get('/', (req, resp) => {
    resp.sendFile(__dirname+'/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('newuser', (username) => {
        if (username === '')
            return socket.emit('disconnect', 'Nikname is undefind');
        socket.name =  username;
        socket.room = rooms[0];
        socket.join(socket.room);
        socket.broadcast.to(socket.room).emit('sendMessage', 'Пользователь:'+socket.name+' вступает в группу');
        addUser(users, socket.name, rooms[0]);  
        console.log(users);
        console.log('New user \'%s\' connect!', username);
    });
    
    socket.on('change room', (room) => {
        console.log('user %s change oldroom %s from to  %s', socket.name, socket.room, room);
        
        socket.leave(socket.room);
        socket.broadcast.to(socket.room).emit('sendMessage', 'Пользователь: '+socket.name+' покидает группу');
        socket.room = room;
        changeRoomUser(users, socket.name,  room);
        socket.join(room);
        socket.broadcast.to(socket.room).emit('sendMessage', 'Пользователь: '+socket.name+' вступает в группу');
    });    

    socket.on('disconnect', (mes) => {
        delUser(users, socket.name);
        console.log('user %s disconnected %s', socket.name, mes);
    });

    socket.on('sendMessage', (msg) => {
        //console.log('name: %s room: %s %s',socket.name, socket.room, msg);
        io.to(socket.room).emit('sendMessage', socket.name+': '+msg);        
    });


});

function addUser(arr, name, room){
    arr.push({name: name, room: room})
};
function delUser(arr, name){
    const index = arr.findIndex(item =>  item.name = name);
    if(index === -1)
        return false;
    arr.splice(index, 1);
};
function changeRoomUser(arr, name, newroom){
    const index = arr.findIndex(item =>  item.name = name);
    if(index === -1)
        return false;
    arr[index].room = newroom;    
};


