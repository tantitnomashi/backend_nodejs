var mongoose = require('mongoose');
var recordSchema = new mongoose.Schema({
    content: String,
    quantity : {type : Number, default : 0},
    creator : String,
    publishDate: Date
    });

var Record = mongoose.model('Record', recordSchema,'record');
module.exports = Record;