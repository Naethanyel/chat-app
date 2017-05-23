var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var numUsers = 0;



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  numUsers++;
  
  socket.on('user connected', (name) => {
    socket.userName = name;
    let message = `${name} connected`
    socket.broadcast.emit('update messages', message);
    io.emit('update num users', `${numUsers} users online`);
  });
  
  socket.on('disconnect', () =>{
    numUsers--
    let message = `${socket.userName} disconnected`;
    socket.broadcast.emit('update messages', message);
    io.emit('update num users', `${numUsers} users online`);

  });
  
  socket.on('send message', (msg) =>{
    let message = `${socket.userName} says: ${msg}`;
    socket.broadcast.emit('update messages', message);
  });
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});