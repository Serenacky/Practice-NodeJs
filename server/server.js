const path = require('path');
const express = require('express');
// const hbs = require('hbs');
const socketIO = require('socket.io');
const http = require('http');

//make the path clean
const publicPath = path.join(__dirname, '../public');

//heroku.
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//message
const {generateMessage} = require('./utils/message');
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chatroom'));

  //send to all other users.
  socket.broadcast.emit('newMessage',generateMessage('Other Users','New user joined'));

  //backend is listening to event 'createMessage'
  socket.on('createMessage',(message, callback)=> {
    console.log('createMessage',message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback('');
  });


  socket.on('disconnect',() => {
    console.log('Disconnected from the client');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
