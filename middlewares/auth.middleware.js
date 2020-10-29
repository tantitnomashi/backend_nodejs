var db = require('../db');
var User = require("../models/user.model");

module.exports.requireAuth = async (req,res,next)=>{
	console.log("------------- auth");
    console.log(req.query.token);
    if(!req.query.token){
		res.status(200);
		res.send({
            message : "need to login first!"
        })
        return;
    }
	var idFromCookie = req.query.token;
    var user = await User.findById(idFromCookie).catch(err => console.log("cannot query"));
    if(!user){
        res.status(200);
		res.send({
            message : "Wrong name!"
        })
        return;
    }
    next();

};