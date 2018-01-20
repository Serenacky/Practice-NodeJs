var express = require('express');
var User = require('../models/User');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login.html');
});

router.post('/signIn', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  var resJson = {};
  User.findOne({
    username:username,
    password:password
  }).then(function(userData) {
        if(!userData) {
          resJson.success = 0;
          resJson.err = 'Username or Password is incorrect!';
          res.json(resJson);
          return false;
        } else {
          if (userData.state) {
              console.log(userData.state);
              resJson.success = 0;
              resJson.err = 'User already online!';
              res.json(resJson);
              return false;
          } else {
            User.update({
              _id: userData._id
            },{
              state: true
            }).then( function() {
            resJson.success = 1;
            resJson.err = "Log in Success!";
            res.cookie("user", userData.username, {maxAge: 1000 * 60 * 60});
            res.json(resJson);
            next();
          })
        }
      }
  })

});

module.exports = router;
