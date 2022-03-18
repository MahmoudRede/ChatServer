
const express = require('express');

const app = express();
const PORT= process.env.PORT || 4000;

const server = app.listen(PORT,()=>{
    console.log('Server is running',PORT)
});

const io = require('socket.io')(server)

io.on('connection',(socket) =>{

    console.log("Connected Succssfuly",socket.id);

    
    socket.on('subscribe', function(data) {
        console.log('subscribe trigged')
        var room_data = data
        userName = room_data.userName;
        const roomName = room_data.roomName;
    
        socket.join(`${roomName}`)
        console.log(`Username : ${userName} joined Room Name : ${roomName}`)

    });        
    

    socket.on('disconnect',() => {

        console.log("DisConnected",socket.id);
 
    });

    socket.on('message',(data)=>{

          var room_name=data.roomName;
        console.log(data);
        socket.broadcast.to(room_name).emit('message-receive',data);

    });
});
