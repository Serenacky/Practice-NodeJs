var socket = io();
socket.on('connect',function() {
  console.log('Connected to the server');
});

socket.on('disconnect',function() {
  console.log('Disconnected from the server');
});
////frontend is listening to event 'createMessage'
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
})
