var mongoose = require('mongoose');
var logSchema = new mongoose.Schema({
    recordId: String,
    creator : String,
    publishDate: Date
    });

var Log = mongoose.model('Log', logSchema,'log');
module.exports = Log;