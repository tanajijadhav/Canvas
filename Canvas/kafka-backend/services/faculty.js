let Course = require("../models/course")

let facultyLandingGet = (user,msg,callback) => {
    try {
        console.log("Inside facultyLandingGet")
        let user_id = user.id
        Course.find({'created_by': user_id}, function(db_error, result) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            else{
                if(result.length > 0){
                    callback(null,{courses:true,data:result})
                    // return res.status(200).json({courses:true,data:result})
                }
                else{
                    callback(null,{courses:false,data:result})
                    // return res.status(200).json({courses:false,data:result})
                }
            }
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
		case 'facultyLandingGet':
            facultyLandingGet(user,msg,callback);
            break;
	}

}

exports.handle_request = handle_request;