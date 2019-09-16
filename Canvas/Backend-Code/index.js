//import the require dependencies
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql')
var path = require('path')
app.set('view engine', 'ejs');
// let db_connection = require('./database');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://18.216.238.150:3000', credentials: true }));
// app.use(cors());

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : true, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    cookie: { secure: false },
    // duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    // activeDuration      :  5 * 60 * 1000
}));

// app.use(session({ resave: true ,secret: '123456789' , saveUninitialized: true}));


// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

// static folder for files
// app.use(express.static('uploads'));
app.use("/uploads",express.static(path.join(__dirname,'uploads')))
//app.use(express.static('uploads'));
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://18.216.238.150:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


// db
// let db_connection = require('./database.js');

// component

let passport = require('passport')
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;


// bcrypt packages


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: 'jwtSecretKey'
}, function (payload, done) {
    try {
        done(null,payload);
    } catch (error) {
        done(error)
    }
}));

var urls =require('./routes/url')
app.use('/',urls(express.Router()));

module.exports = app;

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");