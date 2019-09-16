let PermissionCode = require('../models/permissionCode')

let permissionCodeGenerate = (user,msg,course,callback) => {
    console.log("Generating New Permission Code\n")
    let code_number = Math.floor(Math.random()*90000) + 10000;
    let student = user.id
    try {
        let db_obj = new PermissionCode({course:course,code_number:code_number,student:student})
        db_obj.save().then(result => {
            console.log("Generated new permission code\nQuery Result - \n",result)
            callback(null,{"success":true,"data":result})
            // return res.status(200).json({"success":true,"data":result})
        }).catch(err => {
            console.log("Error", err);
            callback({ "success": false, "message": "Something went wrong! Please try again" },null)
            // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong, Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let permissionCodeList = (user,msg,course,callback) => {
    try {
        PermissionCode.find({'course':course}, function(db_error, result) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else {
                console.log("Fetched the permission codes for a code\n",result)
                callback(null,{"success":true,"data":result.reverse()})
                // return res.status(200).json({"success":true,"data":result.reverse()})
            }
        });

    }
    catch (error) {
        console.log("catch", error)
        callback({"success":false,"message":"Something went wrong, Please try again"},null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
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
		case 'permissionCodeGenerate':
            permissionCodeGenerate(user,msg,course,callback);
            break;
        case 'permissionCodeList' :
            permissionCodeList(user,msg,course,callback);
            break;
	}

}

exports.handle_request = handle_request;