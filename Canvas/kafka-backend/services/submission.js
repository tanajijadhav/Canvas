let Joi = require('joi');
let Submission = require("../models/submission")

let submissionRetrieve = (user,msg,submission_id,callback) => {
    try {
        
        Submission.findOne({'id':submission_id}, function(db_error, submission_obj) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else {
                if (submission_obj === null) {
                    callback(null,{ "success": true, data:[] })
                    // return res.status(200).json({ "success": true, data:[] })
                }
                else {
                    callback(null,{ "success": true, data:submission_obj})
                    // return res.status(200).json({ "success": true, data:submission_obj})
                }
            }
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong, Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let gradeSubmission = (user,msg,submission_id,callback) => {
    const schema = Joi.object().keys({
        grades: Joi.number().integer().min(0),
    });
    let grades = msg.grades
    try {
        Joi.validate({ grades:grades}, schema, (err, value) => {
            if (err) {
                console.log("Joi Error\n", err)
                callback({ "success": false, "message": "Something went wrong, Please try again" },null)
                // res.status(500).json({ "success": false, "message": "Invalid Input! Please try again." });
                // return res;
            }

            Submission.findOne({'id':submission_id}, function(db_error, submission_obj) {
                if (db_error){
                    callback({ "success": false, "message": "Something went wrong, Please try again" },null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong"});
                }
                else {
                    if (submission_obj === null) {
                        callback({ "success": false, "message": "Something went wrong, Please try again" },null)
                        // return res.status(500).json({ "success": false, data:[],message:"Something went wrong! Please try again" })
                    }
                    else {
                        submission_obj.grades = grades
                        submission_obj.save().then(submission_update_success => {
                            callback(null,{"success":true})
                            // return res.status(200).json({"success":true})
                        }).catch(submission_update_err=> {
                            callback({ "success": false, "message": "Something went wrong, Please try again" },null)
                            // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
                        })
                    }
                }
            });

        })
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
    submission = data.submission
    
    switch (type) {
		case 'submissionRetrieve':
            submissionRetrieve(user,msg,submission,callback);
            break;
        case 'gradeSubmission':
            gradeSubmission(user,msg,submission,callback);
            break;   
	}

}

exports.handle_request = handle_request;