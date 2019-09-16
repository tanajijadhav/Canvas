// var bcrypt = require('bcrypt');
let Joi = require('joi');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

let registerPost = (msg, callback) => {
    console.log("Data from Frontend\n",msg);
        const schema = Joi.object().keys({
            name : Joi.string().required(),
            email: Joi.string().email().required(),
            password : Joi.string().required(),
            is_faculty : Joi.boolean().required(),
        });
        try {
            let name =msg.name;
            let email =msg.email;
            let password =msg.password;
            let is_faculty =msg.is_faculty;
            const user = { name: name, email: email,password:password,is_faculty:is_faculty};

            Joi.validate(user, schema, (err, value) => {
                if (err) {
                    callback({"success":false,"message":"Invalid Input! Please try again."}, null)
                    // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."});
                    // return res;
                }
                else{
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        if(err){
                            callback({"success":false,"message":"Something went wrong! Please try agin later"}, null)
                            // res.status(500).json({"success":false,"message":"Something went wrong! Please try agin later"});
                            // return res;
                        }
                        User.findOne({ email: email }, function(user_error, user_obj) {
                            if (user_error){
                                // console.log("Error",err);
                                callback({"success":false,"message":"Something went wrong! Please try agin later"}, null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            if(user_obj !== null){
                                callback({"success":false,"message":"User with same email already present"}, null)
                                // return res.status(500).json({"success":false,"message":"User with same email already present"});
                            }
                            let db_obj = new User({name:name,password:hash,email: email,is_faculty:is_faculty})
                            db_obj.save().then(result => {
                                console.log("New User registered successfully\n",result);
                                callback(null,{"success":true,"message":"Registration successfull! Click Login"})
                                // return res.status(200).json({"success":true,"message":"Registration successfull! Click Login"});
                            }).catch(err => {
                                // console.log("Error",err);
                                // return res.status(500).json({"success":false,"message":"User with same email already exists"});
                                callback({"success":false,"message":"User with same email already exists"},null)
                            })
                        });
                        
                    });
                }
            });
        }
        catch(error){
            console.log("Error",error);
            callback({"success":false,"message":"Invalid Input! Please try again."},null)
            // res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
            // return res;
        }
}

let loginPost = (msg, callback) => {
    console.log("Data from Frontend\n",msg);
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password : Joi.string().required(),
        is_faculty : Joi.boolean().required(),
    });
    try{
        // let logged_in = false;
        let email = msg.email;
        let password = msg.password;
        let is_faculty = msg.is_faculty;
        const user_obj = {email: email,password:password,is_faculty:is_faculty};
        Joi.validate(user_obj, schema, (err, value) => {
            if (err) {
                console.log("Inisde error")
                callback({"success":false,"message":"Invalid Input! Please try again."}, null)
                // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."});
                // return res;
            }
            else{
                console.log("idr")
                User.find({ email: email }, function(err, result) {
                    if (err){
                        console.log("Error",err);
                        callback({"success":false,"message":"Something went wrong! Please try again"}, null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                    }
                    else{
                        // console.log("----my user----\n",result)
                        if (result.length == 0 ){
                            console.log("User with this email not present.")
                            callback({"success":false,"message":"User with this email not present"}, null)
                            // return res.status(401).json({"success":false,"message":"User with this email not present"});
                        }
                        else{
                            bcrypt.compare(password, result[0].password, function(err, password_res) {
                                if(password_res){
                                    if (result[0].is_faculty == is_faculty){
                                        let token = jwt.sign({id:result[0].id,email:result[0].email}, 'jwtSecretKey', { expiresIn: '30 days' });
                                        // console.log("JWT",token);
                                        delete result[0].password
                                        console.log("User logged in\nSending 200 with JWT\n\n\n\n",token)
                                        callback(null,{"success":true,"message":"Sucessfully logged in","token":token,user:result[0]})
                                        // return res.status(200).json({"success":true,"message":"Sucessfully logged in","token":token,user:result[0]});
                                    }
                                    else{
                                        // console.log("Illegal -----");
                                        console.log("User trying to login in wrong section...Access Denied")
                                        callback({"success":false,"message":"Access Denied"},null)
                                        // return res.status(401).json({"success":false,"message":"Access Denied"});
                                    }
                                }
                                else{
                                    // console.log("else");
                                    // console.log()
                                    console.log("Incorrect password entered by user...Incorrect Password")
                                    callback({"success":false,"message":"Incorrect password"},null)
                                    // return res.status(500).json({"success":false,"message":"Incorrect password"});
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    catch(error){
        console.log("Error",error);
        callback({"success":false,"message":"Invalid Input! Please try again."},null)
        // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."}); 
        // return res;
    }
}


function handle_request(data,callback){
    msg = data.msg
    type = data.type
    user = data.user
    console.log("type",type)
    switch (type) {
		case 'loginPost':
            loginPost(msg,callback);
            break;
        case 'registerPost' :
            registerPost(msg,callback);
            break;
	}

}

exports.handle_request = handle_request;