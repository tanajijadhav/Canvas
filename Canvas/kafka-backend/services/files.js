let Joi = require('joi');
let Files = require("../models/file")

let filePost = (user,msg,course,assignment,user_file_obj,callback) => {
    try {
        console.log("-----kafka filepost backend------\n",user_file_obj)
        const schema = Joi.object().keys({
            file: Joi.string().required(),
            filename: Joi.string().required(),
        });
        let file = user_file_obj.path
        let filename = user_file_obj.originalname
        let uploaded_by = user.id
        Joi.validate({ file:file,filename:filename }, schema, (err, value) => {
            if (err) {
                console.log("Joi Error\n", err)
                callback({ "success": false, "message": "Invalid Input! Please try again." },null)
                // res.status(500).json({ "success": false, "message": "Invalid Input! Please try again." });
                // return res;
            }
            let db_obj = new Files({ course: course, uploaded_by: uploaded_by, file: file, filename: filename})
            db_obj.save().then(file_obj => {
                console.log("Created", file_obj)  
                callback(null,{ "success": true, "message": "File Uploaded successfully!" })
                // return res.status(200).json({ "success": true, "message": "File Uploaded successfully!" })
            }).catch(err => {
                console.log("Error", err);
                callback({ "success": false, "message": "Something went wrong, Please try again" },null)
                // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
            });
        })
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong, Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let fileGet = (user,msg,course,assignment,callback) => {
    try {
        console.log("-----kafka fileget backend------\n",msg)
        Files.find({'course':course}, function(db_error, result) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                console.log("File list",result)
                callback(null,{ "success": true, "data":result.reverse() })
                // return res.status(200).json({ "success": true, "data":result.reverse() })
            }
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong, Please try again" },null)
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
    
    switch (type) {
		case 'filePost':
            filePost(user,msg,course,assignment,file,callback);
            break;
        case 'fileGet' :
            fileGet(user,msg,course,assignment,callback);
            break;
	}

}

exports.handle_request = handle_request;