var mongoose = require('../MongoDB').mongoose
    ,db = require('../MongoDB').db
    ;

var userSchema = new mongoose.Schema({
  userid: String,
  nickname: String,
  email:{type:String,match:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
  created: { type: Date, default: Date.now },
  lastLogin: Date,
});
module.exports = db.model('User', userSchema);
