var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    phone: String, 
    role: String
});

var User = mongoose.model('User', userSchema,'user');
module.exports = User;