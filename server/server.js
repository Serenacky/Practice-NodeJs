const path = require('path');
const express = require('express');
// const hbs = require('hbs');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
//make the path clean
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage{'Serena','Welcome to the chatroom'});

  socket.broadcast.emit('newMessage',generateMessage{'Serena','New user joined'});

  //backend is listening to event 'createMessage'
  socket.on('createMessage',(message)=> {
    console.log('createMessage',message);
    io.emit('newMessage', generateMessage(message.from,message.text));
  });


  socket.on('disconnect',() => {
    console.log('Disconnected from the client');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// hbs.registerPartials(path.join(__dirname, '../views/partials'));
// app.set('view engine', 'hbs');
//
// hbs.registerHelper('getCurrentYear', () => {
//   return new Date().getFullYear()
// });
//
// hbs.registerHelper('screamIt', (text) => {
//   return text.toUpperCase();
// });
//
// app.get('/', (req, res) => {
//   res.render('home.hbs', {
//     pageTitle: 'Home Page',
//     welcomeMessage: 'Welcome to my website'
//   });
// });
//
// app.get('/about', (req, res) => {
//   res.render('about.hbs', {
//     pageTitle: 'About Page'
//   });
// });
//
// // /bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
//   res.send({
//     errorMessage: 'Unable to handle request'
//   });
// });
