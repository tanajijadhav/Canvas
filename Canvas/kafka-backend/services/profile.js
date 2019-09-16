let Joi = require('joi');
const User = require('../models/user')

let profileGet = (user,msg,callback) => {
    try {

        User.find({ email: user.email }, function(db_error, result) {
            if (db_error){
                console.log("Error",db_error);
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            else{
                if (result.length == 0)
                {
                    console.log("No user found with given email");
                    callback({"success":false,"message":"Something went wrong! Please try again"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }
                else{
                    let result_data = result[0]
                    delete result_data.id
                    delete result_data.email
                    delete result_data.password
                    delete result_data.is_faculty
                    // console.log(result_data)
                    if ((result_data||{}).profile_pic){
                        result_data.profile_pic = ("http://18.191.237.120:3001/"+result_data.profile_pic)
                    }
                    else{
                        result_data.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                    }
                    console.log("User profile data\n",result_data)
                    callback(null,{"success":true,"user":result_data})
                    // return res.status(200).json({"success":true,"user":result_data})
                }
            }
        });
    }
    catch(error){
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

let profilePost = (user,msg,file,callback) => {
    // console.log("Request from frontend--------------\n",msg)
    const schema = Joi.object().keys({
        name : Joi.string().required(),
        phone_number : Joi.string().allow(null,''),
        about_me : Joi.string().allow(null,''),
        city : Joi.string().allow(null,''),
        country : Joi.string().allow(null,''),
        company : Joi.string().allow(null,''),
        school : Joi.string().allow(null,''),
        hometown : Joi.string().allow(null,''),
        language : Joi.string().allow(null,''),
        gender : Joi.string().allow(null,''),
        profile_pic : Joi.string().allow(null,''),
    });
    try {
        const req_user_obj = msg
        console.log("Files\n",file)
        let profile_pic = null
        if (file){
            profile_pic = file.path
        }
        else{
            profile_pic= msg.profile_pic.replace("http://18.191.237.120:3001/","")
        }
        
        Joi.validate(req_user_obj, schema, (joi_err, value) => {
            if (joi_err) {
                console.log(joi_err)
                callback({"success":false,"message":"Invalid Input! Please try again."},null)
                // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."});
                // return res;
            }
            else{
                User.find({ email: user.email }, function(db_err, result) {
                    if (db_err){
                        console.log("Error",db_err);
                        callback({"success":false,"message":"Something went wrong! Please try again"},null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                    }
                    else{
                        if (result.length == 0){
                            console.log("No user found with given email")
                            callback({"success":false,"message":"Something went wrong! Please try again"},null)
                            // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                        }
                        else{
                            user_obj = result[0]
                            user_obj.name = req_user_obj.name
                            user_obj.phone_number = req_user_obj.phone_number
                            user_obj.about_me = req_user_obj.about_me
                            user_obj.city = req_user_obj.city
                            user_obj.country = req_user_obj.country
                            user_obj.company = req_user_obj.company
                            user_obj.school = req_user_obj.school
                            user_obj.hometown = req_user_obj.hometown
                            user_obj.language = req_user_obj.language
                            user_obj.gender = req_user_obj.gender
                            user_obj.profile_pic = profile_pic
                            user_obj.save().then(update_resonse => {
                            console.log("Profile updated successfully.\nUpdate query output - \n",update_resonse);
                            callback(null,{"success":true,"message":"Data updated successfully"})
                            // return res.status(200).json({"success":true,"message":"Data updated successfully"});
                            }).catch(err => {
                                console.log("Error",err);
                                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again!"});
                            });
                        }
                    }
                });
            }
        });
    }
    catch(error){
        console.log("Error",error);
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}


function handle_request(data,callback){

    msg = data.msg
    type = data.type
    user = data.user
    course = data.course
    assignment = data.assignment
    file = data.file
    page = data.page
    
    switch (type) {
		case 'profileGet':
        profileGet(user,msg,callback);
            break;
        case 'profilePost' :
            profilePost(user,msg,file,callback);
            break;
	}

}

exports.handle_request = handle_request;