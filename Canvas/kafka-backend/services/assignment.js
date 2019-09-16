let Joi = require('joi');
let Assignment = require("../models/assignment")
let User = require("../models/user")
let Submission = require("../models/submission")

let assignmentSubmissionList = (user,msg,course,assignment,callback) => {
    try{
        let output = []
        Submission.find({'assignment':assignment}, function(db_error, result) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                if(result.length == 0){
                    callback(null,{data:[]})
                    // return res.status(200).json({data:[]})
                }
                let user_ids = []
                let submissions = []
                result.forEach(elem => {
                    submissions.push(elem)
                    if(!user_ids.includes(elem.student)){
                        user_ids.push(elem.student)
                    }
                })
                console.log('----Submissions-----',submissions)
                User.find({'id':{$in:user_ids}}, function(student_error, user_details) {
                    if (student_error){
                        callback({"success":false,"message":"Something went wrong"},null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong"});
                    }
                    else{
                        let output = [];
                        user_details.forEach(main_user_obj=>{
                            let user_obj = Object.assign({},main_user_obj)
                            user_obj = user_obj._doc
                            let grades = 0
                            submissions.forEach(sub_obj =>{
                                console.log("---sumission\n",sub_obj.file)
                                if (sub_obj.student == user_obj.id)
                                {   
                                    // console.log("Inside if")
                                    if("submissions" in user_obj){
                                        console.log("2nd time onwards")
                                        user_obj.submissions.push(sub_obj)
                                    }
                                    else{
                                        console.log("1st time")
                                        user_obj["submissions"] = []
                                        // console.log("----submissionobjects----\n",sub_obj)
                                        user_obj.submissions.push(sub_obj)
                                    }
                                    if (grades < sub_obj.grades)
                                    {
                                        grades = sub_obj.grades
                                    }
                                }
                            })
                            user_obj["grades"] = grades
                            output.push(user_obj)
                        })
                        console.log("List of submissions grouped by student - \n",output)
                        callback(null,{data:output})
                        // return res.status(200).json({data:output})
                    }
                });
            }
        });

    }
    catch (error) {
        // console.log("catch",error)
        callback({"success":false,"message":"Something went wrong, Please try again"},null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let assignmentSubmissionFiles = (user,msg,course,assignment,callback) => {
    let student = user.id
    try {
        Submission.find({'assignment':assignment,'student':student}, function(db_error, result) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                if(result.length == 0){
                    callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                    // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
                }
                else{
                    console.log("submission objs", result)
                    callback(null,{ "success": true, data: result.reverse() })
                    // return res.status(200).json({ "success": true, data: result.reverse() })
                }
            }
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({"success":false,"message":"Something went wrong"},null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}


let assignmentSubmit = (user,msg,course,assignment,file_obj,callback) => {
    console.log("assignmentSubmit\n", file_obj)
    const schema = Joi.object().keys({
        file: Joi.string().required(),
    });
    try {
        let file = file_obj.path
        Joi.validate({ file: file }, schema, (err, value) => {
            if (err) {
                console.log("Joi Error\n", err)
                callback({ "success": false, "message": "Invalid Input! Please try again." },null)
                // res.status(500).json({ "success": false, "message": "Invalid Input! Please try again." });
                // return res;
            }
            file = "http://18.191.237.120:3001/" + file
            let filename = file_obj.originalname
            let student = user.id

            Assignment.findOne({'course':course,'id':assignment}, function(db_error, assignment_obj) {
                if (db_error){
                    callback({"success":false,"message":"Something went wrong"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong"});
                }
                else {
                    if (assignment_obj === null) {
                        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                        // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
                    }
                    else {
                        let submission_obj = new Submission({ assignment: assignment, student: student, file: file, filename: filename })
                        submission_obj.save().then(submission_success => {
                            console.log("File submitted for particular assignment",submission_success)
                            callback(null,{ "success": true, "message": "Submission submitted successfully!" })
                            // return res.status(200).json({ "success": true, "message": "Submission submitted successfully!" })
                        }).catch(submission_err => {
                            console.log("ERROR - ",submission_err)
                            callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                            // return res.status(500).json({"success":false,"message":"Something went wrong"});
                        });
                    }
                }
            });

        })
    }
    catch (error) {
        console.log("catch", error)
        // console.log("returning")
        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let assignmentRetrieve = (user,msg,course,assignment,callback) => {

    try {
        Assignment.findOne({'course':course,'id':assignment}, function(db_error, assignment_obj) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else {
                if (assignment_obj === null) {
                    callback({"success":false,"message":"Something went wrong"},null)
                    // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
                }
                else {
                    console.log("Assignment_obj", assignment_obj)
                    callback(null,{ "success": true, data: assignment_obj })
                    // return res.status(200).json({ "success": true, data: assignment_obj })
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

let assignmentList =  (user, msg, course, callback) => {
    try {
        Assignment.find({'course':course}, function(err, assignments) {
            if (err){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                console.log("List of Assignments", assignments)
                callback(null,{ "success": true, data: assignments })
                // return res.status(200).json({ "success": true, data: assignments })
            }
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({"success":false,"message":"Something went wrong"},null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let assignmentCreate = (user, msg, callback) => {
    console.log("Request to create assignment\n", msg)
    const schema = Joi.object().keys({
        points: Joi.number().integer().min(0),
        course: Joi.string().required(),
        due_date: Joi.string().required(),
        body: Joi.string().required(),
        title: Joi.string().required(),
    });
    try {
        let course = msg.course
        let body = msg.body
        let title = msg.title
        let points = msg.points
        let due_date = msg.due_date
        Joi.validate({ course: course, body: body, title: title, points: points, due_date: due_date }, schema, (joi_err, value) => {
            if (joi_err) {
                console.log("Joi Error\n", joi_err)
                callback({ "success": false, "message": "Invalid Input! Please try again." },null)
                // return res.status(500).json({ "success": false, "message": "Invalid Input! Please try again." });
            }
            
            let db_obj = new Assignment({ course: course, body: body, title: title, points: points, due_date: due_date })
            db_obj.save().then(result => {
                console.log("Created  a new assignment succesfully\n", result)
                callback(null,{ "success": true, "message": "Assignment created successfully!" })
                // return res.status(200).json({ "success": true, "message": "Assignment created successfully!" })
            }).catch(err => {
                console.log("Error",err);
                callback({ "success": false, "message": "Invalid Input! Please try again." },null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            })
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
    course = data.course
    assignment = data.assignment
    file = data.file
    
    switch (type) {
		case 'assignmentCreate':
            assignmentCreate(user,msg,callback);
            break;
        case 'assignmentList' :
            assignmentList(user,msg,course,callback);
            break;
        case 'assignmentRetrieve' :
            assignmentRetrieve(user,msg,course,assignment,callback)
            break;
        case 'assignmentSubmit' :
            assignmentSubmit(user,msg,course,assignment,file,callback);
            break;
        case 'assignmentSubmissionFiles' :
            assignmentSubmissionFiles(user,msg,course,assignment,callback)
            break;
        case 'assignmentSubmissionList' :
            assignmentSubmissionList(user,msg,course,assignment,callback)
            break;
	}

}

exports.handle_request = handle_request;