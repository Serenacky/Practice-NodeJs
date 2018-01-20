
const express = require('express');
const mongoose = require('mongoose');
const swig = require('swig');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = new express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const User = require('./models/User');

//静态文件托管
app.use('/public', express.static(__dirname + '/public'));

//设置模板
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({
    cache: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*设置cookie*/
app.use(cookieParser());

app.use('/', require('./routers/index'));
app.use('/login', require('./routers/login'));
app.use('/register', require('./routers/register'));
app.use('/exit', require('./routers/exit'));

mongoose.connect('mongodb://localhost:27017/Users');

const port  = process.env.PORT || 3000;  //heroku.
server.listen(port, ()=> {
  console.log(`Connected to port ${port}`);
});


const {createMessage} = require('./schemas/message');
io.on('connection', function(socket){
    console.log('Sign in Page');

    socket.on('login', function (doc) { //log in
        console.log('lai');
        var username = doc.username;
        console.log(username);
        socket.username = username;
        User.find().then(function (doc) {
            console.log('hhhh');

            for (var i = 0; i < doc.length; i++) {
                if (!doc[i].state) {
                    doc.splice(i, 1);
                }
            }
            console.log(`username is ${username}`);
            socket.emit('loginSuccess', doc);
            socket.broadcast.emit('usersList', doc);
            socket.broadcast.emit('userEnter',username);
        });
    });
    console.log('connect to the client!');

    // backend is listening to event 'postMessage'
    socket.on('postMessage',(message, callback)=> {
        socket.broadcast.emit('recieveMsg', createMessage(message.from,message.text));
        callback();
    });


    socket.on('disconnect', function (data) {//退出
        var username = data.username || socket.username;
        User.findOne({
            username: username
        }).then(function (userInfo) {
            if (userInfo) {
                return User.update({
                    _id: userInfo._id
                }, {
                    state: false
                })
            }
        }).then(function () {
            return User.find();
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (!data[i].state) {
                    data.splice(i, 1);
                }
            }
            socket.broadcast.emit('usersList', data);
            socket.broadcast.emit('userLogOut', username);
        })
    });
});
