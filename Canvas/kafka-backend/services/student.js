let Joi = require('joi');
let Enrollment = require("../models/enrollment")
let Course = require("../models/course")

let studentLandingGet = (user,msg,callback) => {
    try {
        console.log("Inside studentLandingGet")
        let user_id = user.id
        let output = []
        Enrollment.find({student: user_id,is_active:true}, function(err, result) {
            if (err){
                // console.log("Error",err);
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            console.log("enrolled courses ids \n",result)
            course_ids = result.map(elem => elem.course);
            Course.find({'id': {$in:course_ids}}, function(inner_err, my_courses) {
                if (inner_err){
                    // console.log("Error",err);
                    callback({"success":false,"message":"Something went wrong! Please try again"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }
                else{
                    for (let x in my_courses){
                        for (let y in result){
                            if (my_courses[x].id == result[y].course)
                            {
                                let temp = Object.assign({"status":result[y].status},my_courses[x]._doc)
                                output.push(temp)
                            }
                        }
                    }
                    console.log("Student enrolled courses - \n",output)
                    callback(null,{"data":output})
                    // res.status(200).json({"data":output});
                }
            });
        });
    }
    catch(error){
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}


function handle_request(data,callback){

    msg = data.msg
    type = data.type
    user = data.user
    
    switch (type) {
		case 'studentLandingGet':
            studentLandingGet(user,msg,callback);
            break;
	}

}

exports.handle_request = handle_request;