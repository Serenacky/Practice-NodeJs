var socket = io();
socket.on('connect',function() {
  console.log('Connected to the server');
});

socket.on('disconnect',function() {
  console.log('Disconnected from the server');
});


//frontend is listening to event 'newMessage'
// to print message on the screen.
socket.on('newMessage', function(message) {
  var formattedTime = moment(message.timestamp).format('MMM Do YYYY, h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from:message.from,
    text:message.text,
    time:formattedTime
  });
   jQuery('#messages').append(html);
});

//after submit event, emit createMessage to server,
//server will call callback function.
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function () {
    jQuery('[name=message]').val('')
  });
});
