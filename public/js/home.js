document.cookie = 'flag=true';
var username = $('#username').text();
var socket = io.connect('http://localhost:3000');

socket.emit('login', {username: username});
console.log(username);


//Somebody Join in
socket.on('userEnter', function (name) {

    var html = '<div class="row"><div class="alert alert-light col-sm-5 col-md-offset-3 color-enter" role="alert">';
    html += '<p class="message-head">user@' + name + ' has entered the chat room.</p></div></div>';

    jQuery('#messages').append(html);
});

//Somebody exit
socket.on('userLogOut', function (name) {
    var html = '<div class="row"><div class="alert alert-light col-sm-5 col-md-offset-3 color-leave" role="alert">';
    html += '<p class="message-head">user@' + name + ' has leaved the chat room.</p></div></div>';
    $('#messages').append(html);
});

socket.on('loginSuccess', function (data) {
    userUpdate(data);
    var html = '<div class="row"><div class="alert alert-light col-sm-5 col-md-offset-3 color-welcome" role="alert">';
    html += '<p class="message-head">Welcome to the chat room.</p></div></div>';
    $('#messages').append(html);
});


//frontend is listening to event 'newMessage'
// to print message on the screen.
socket.on('recieveMsg', function(message) {
    if (message.text == '') {
        return;
    }
    var formattedTime = moment(message.timestamp).format('MMM Do YYYY, h:mm a');
    var html = '<div class="row"><div class="alert col-sm-4 color-leave" role="alert">';
    html += '<p class="message-head">' + message.from + '</p>';
    html += '<h5 class="message-body">' + message.text + '</h5>';
    html += '<p class="message-time">'+ formattedTime + '</p></div></div>';

    jQuery('#messages').append(html);
});


//update users
socket.on('usersList', function (data) {
    userUpdate(data);
});


//send message
$('#sendBtn').on('click', function (e) {

    e.preventDefault();
    var text = $('#msgInput').val();
    console.log(text);
    var username = $('#username').text();
    console.log(username);
    if (text == '') {
        console.log('?');
        return;
    }

    // socket.emit('needTime');
    var formattedTime = moment().format('MMM Do YYYY, h:mm a');
    var html = '<div class="row"><div class="alert col-sm-4 col-md-offset-5 color-card" role="alert">';
    html += '<p class="message-head">' + username + '</p>';
    html += '<h5 class="message-body">' + text + '</h5>';
    html += '<p class="message-time">'+ formattedTime + '</p></div><div class="row">';

    console.log(username);
    console.log(text);
    console.log(formattedTime);

    jQuery('#messages').append(html);

    socket.emit('postMessage', {
        from: username,
        text: text
    },function () {
        jQuery('[name=message]').val('')
    });
});

//exit
$('#exitBtn').on('click', function () {
    var username = $('#username').text();
    location.href = 'exit';
});


function userUpdate(data) {
    var len = data.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += '<li>';
        str += '<span>' + data[i].username + '</span>'
    }
    $('#memberList').html(str);
}



