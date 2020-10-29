var Record = require("../models/record.model");
var Log = require("../models/log.model");

const moment= require('moment'); 
const User = require("../models/user.model");

//use this file as a controller 
module.exports.testAPI = async  (req,res)=> {
    res.status(200);
    res.send({result : 9999});
};
module.exports.index = async  (req,res)=> {
    var records = await Record.find({});   
    if(records){
        res.status(200);
        res.send({
            list : records
        })
    }else{
        res.status(404);
        res.send({
            message : "fail get list!"
        })
    }
  
};
module.exports.getRecords = async  (req,res)=> {
 
    console.log("creatorrrr");
    var creator =  req.query.creator;
    var records = await Record.find({creator: creator});   
   

    if(records){
        res.status(200);
        res.send({
            list : records
        })
    }else{
        res.status(404);
        res.send({
            message : "fail get list of creator!"
        })
    }
  
};

module.exports.searchByDateRange = async (req,res)=> {
   var startDate = moment(req.query.startTime).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
   var endDate   = moment(req.query.endTime).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00
    console.log(startDate + " ------" + endDate);
   
   var records = await Record.find({publishDate:
    {
        $gt:  startDate,
        $lt:  endDate
    }
    });   

    if(records){
        res.status(200);
        res.send({
            records : records
        })
    }else{
        res.status(404);
        res.send({
            message : "search date range fail!"
        })
    }
    
};

module.exports.searchByContent = async (req,res)=> {
    var content = req.query.content;
   // var matched = await Record.find({content: new RegExp('*'+content+'*', "i")});
   var matched = await Record.find({content: "aaa"});
    if(matched){
        res.status(200);
        res.send({
            list : matched
        })
    }else{
        res.status(404);
        res.send({
            message : "search fail!"
        })
    }
    
};

module.exports.get = async(req,res)=>{
    var id =req.query.id;
    var record = await Record.findById(id);
    res.status(200);
    res.send({
        record : record
    })
  };

module.exports.create = (req,res)=>{
    res.render('record/create');
};
module.exports.createP = async(req,res)=>{
    var record = new Record({
        content: req.body.content,
        quantity: Number(req.body.quantity),
        creator: req.body.creator,
        publishDate: Date.now()
    });
    await record.save().then((rs)=>{
        console.log(rs);
 
        var log = new Log({
            recordId: rs._id,
            creator : rs.creator,
            publishDate: Date.now()
        });

        log.save().then((rs) => {
            if(rs){
                res.status(200);
                res.send({
                    message : "created!"
                })
            }
        }).catch((err) => {
            throw err;
        });
      
    }).catch((err) => {
        throw err;
    });
   
};


module.exports.delete = async (req,res)=>{
    var id = req.query.id;
    // var matched = await Record.find({content: new RegExp('*'+content+'*', "i")});
    //var matched = await Record.find({id: id});
    var rs = await Record.remove({_id: id});
    //rs : { n: 0, ok: 1, deletedCount: 0 }
        if(rs.ok){
            res.status(200);
            res.send({
                message : "delete successfully!"
            })
        }else{
            res.status(200);
            res.send({
                message : "delete fail!"
            })
        }
 

     
};
var findSumOfCreator = async function (creator){
	var records = await Record.find({creator: creator});  
	var amount = 0; 
	if(records.length > 0){
		records.forEach(function(item, index, array) {
			amount+= item.quantity;
		});

	}
	var obj = {
		creator : creator,
		amount  : amount
	}
	return obj;	 
}
var getCreatorList = async ()=>{
	var users = await User.find();
	var creators = users.map(x => x.username);
	return creators;
}

           
module.exports.findSum = async (req,res)=>{   
	var creator =  req.query.creator;
	 var rs = await findSumOfCreator(creator);
	 var cr = await getCreatorList();
	 console.log(cr);
	 if(rs && rs.amount > 0){		
		res.status(200);
		res.send({
			  message : "delete successfully!",
			  data  : rs
		  })
	 }else{
		res.status(200);
		res.send({
			message : "sum fail!",
			data : 0,

		})
}

module.exports.findSumAdmin = async (req,res)=>{   
	//var creator =  req.query.creator;
	// var rs = await findSumOfCreator(creator);
	// var creators = await getCreatorList();
     
	// var rsList = await creators.map(x => findSumOfCreator(x));
	    
	// console.log(rsList);
	 res.send({
			  	  message : "delete successfully!",
				  data  : 0
			  })
	//  if(rs && rs.amount > 0){		
	// 	res.status(200);
	// 	res.send({
	// 		  message : "delete successfully!",
	// 		  data  : rs
	// 	  })
	//  }else{
	// 	res.status(200);
	// 	res.send({
	// 		message : "sum fail!",
	// 		data : 0,

	// 	})
	// }
}


        
 

}
