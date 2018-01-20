const mongoose = require('mongoose');

var user = mongoose.Schema({
    username:{
      type: String
    },
    password:{
      type:String
    },
    state:{
      type:Boolean
    }
});

module.exports = user;
