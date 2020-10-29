  
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// cookie parser
var cookieParser = require('cookie-parser')
// body-parser for parse 

app.use(cors());
//app.use(express.json());

// connect to mongo
const uri = process.env.COMPASS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
// for cookie 
//minhtan is sercret string for signed cookie
app.use(cookieParser(process.env.SESSION_SERCRET));


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB successfully by Tan");
})

//route
var authRoute = require('./routes/auth.route');
var recordRoute = require('./routes/record.route');
app.use('/auth', authRoute);
app.use('/record',recordRoute);
app.get('/', (req,res)=> { 
   res.send("Hello from Singapore");
});
// port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// write backend first and use the postman to test api 