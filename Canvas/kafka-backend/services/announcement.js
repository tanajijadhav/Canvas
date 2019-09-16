let Joi = require('joi');
let Announcement = require("../models/announcement")
let User = require("../models/user")

let announcementGet = (user, msg, course, callback) => {
    try {
        
        Announcement.find({'course':course}, function(db_error, announcements) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else {
                console.log("Announcements \n",announcements)
                let user_ids = []
                announcements.forEach(elem => {
                    user_ids.push(elem.created_by)
                })
                console.log("User ids \n",user_ids)
                User.find({'id':{$in:user_ids}}, function(inner_db_error, user_list) {
                    if (inner_db_error){
                        callback({"success":false,"message":"Something went wrong"},null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong"});
                    }
                    else{
                        user_list.forEach(elem =>{
                            if(elem.profile_pic){
                                elem.profile_pic = "http://18.191.237.120:3001/" + elem.profile_pic
                              }  
                              else{
                                elem.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                              }
                        })

                        user_info = []
                        
                        user_ids.forEach(elem => {
                            for(let user_obj in user_list){
                                if(elem == user_list[user_obj].id){
                                    user_info.push(user_list[user_obj])
                                }
                            }
                        })

                        let output = {}
                        console.log(user_list)  
                        output["created_by"] = user_info
                        output["announcements"] = announcements
                        // return res.status(200).json({data:output})
                        callback(null,{data:output})
                    }
                });
            }
        });

    }
    catch(error){
        callback({"success":false,"message":"Something went wrong"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}


let announcementPost = (user, msg, callback) => {
    console.log("Request from frontend\n ",msg)
    const schema = Joi.object().keys({
        course : Joi.string().required(),
        message: Joi.string().required(),
        title : Joi.string().required(),
    });
    try {
        let course = msg.course
        let message = msg.message
        let title = msg.title
        let created_by = user.id
        Joi.validate({course:course,message:message,title:title}, schema, (err, value) => {
            if (err) {
                callback({"success":false,"message":"Invalid Input! Please try again."},null)
                // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."});
                // return res;
            }

            let db_obj = new Announcement({course:course,created_by:created_by,message:message,title:title})
            db_obj.save().then(announcement_obj => {
                console.log("Announcement object created\n",announcement_obj)   
                callback(null,{"success":true,"message":"Announcement posted successfully!",data:announcement_obj})
                // return res.status(200).json({"success":true,"message":"Announcement posted successfully!",data:announcement_obj})
            }).catch(err => {
                console.log("Error",err);
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            })

        })
    }
    catch(error){
        console.log("catch",error)
        callback({"success":false,"message":"Something went wrong, Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

function handle_request(data,callback){
    console.log("Data from in objc",data)
    msg = data.msg
    type = data.type
    user = data.user
    course = data.course
    switch (type) {
		case 'announcementPost':
            announcementPost(user,msg,callback);
            break;
        case 'announcementGet' :
            announcementGet(user,msg,course,callback);
            break;
	}

}

exports.handle_request = handle_request;