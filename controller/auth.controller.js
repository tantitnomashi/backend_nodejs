// User model MongoDb
var User = require("../models/user.model");

module.exports.login =  (req,res)=> {
    res.render('auth/login');
};
module.exports.loginP = async (req,res)=> {
    var username = req.body.username;
    var password = req.body.password;
    var user = await User.findOne({ username: username}).exec().catch(error => { throw error});
    if(!user){
        res.status(200);
        res.send({
            message : "No user found!"
        })
    }else if(!user || user.password !== password ){
       res.status(200).send({
           message : "Wrong email orpassword"
       })
    }else{
        
        // res.cookie('userID',user.id,{
        //     signed: "true"
        //  }); // signed cookie 
        res.status(200);
        res.send({
			message : "Log in successfully",
			token : user.id
        })
    }
   

};
