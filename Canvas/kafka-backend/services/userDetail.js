let User = require("../models/user")

let UserDetail = (user,msg,callback) => {
    // name, email, faculty
    const user_id = user.id

    User.findOne({ id: user_id }, function(db_error, user_obj) {
        if (db_error){
            callback({"success":false,"message":"Something went wrong! Please try again"},null)
            // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
        }
        else{
            if(user_obj === null){
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            else{
                delete user_obj.password
                callback(null,{success:true,data:user_obj})
                // return res.status(200).json({success:true,data:user_obj})
            }
        }
    });
}



function handle_request(data,callback){

    msg = data.msg
    type = data.type
    user = data.user
    
    switch (type) {
		case 'UserDetail':
            UserDetail(user,msg,callback);
            break;
	}

}

exports.handle_request = handle_request;