var express = require('express')
var router = express.Router();
var controller = require('../controller/record.controller'); 
var auth = require('../middlewares/auth.middleware');

// database lowdatabse 
router.get('/',auth.requireAuth, controller.index);
router.get('/get',controller.get);
router.get('/findSum',auth.requireAuth,controller.findSum);
router.get('/search', controller.searchByContent);
router.get('/getRecords', controller.getRecords);
router.get('/delete', controller.delete);
router.get('/test', controller.testAPI);
router.get('/daterange', controller.searchByDateRange);

router.post('/create',controller.createP);
module.exports = router;
// export method to the route