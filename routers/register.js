var express = require('express');
var User = require('../models/User');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('register.html');
});



router.post('/signUp', function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var resJson = {};
  User.findOne({
    username:username
  }).then(function(userData) {
        if(userData) {
          resJson.success = 0;
          resJson.err = 'Username already been taken!';
          res.json(resJson);
          return false;
        } else {
          var user = new User({
            username: username,
            password: password,
            state: false
          });
          return user.save();
        }
  }).then( function() {
            resJson.success = 1;
            resJson.message = "Register Success!";
            res.json(resJson);
  })
});

module.exports = router;
