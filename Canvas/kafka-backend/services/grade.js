let Assignment = require("../models/assignment")
let Submission = require("../models/submission")
let Quiz = require("../models/quiz")
let UserQuiz = require("../models/userQuiz")

let assignmentGradeGet = (user,msg,course,callback) => {
    try {
        let output = [];
        let student = user.id
        
        Assignment.find({'course':course}, function(db_error, assignments) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                let studentAssignmentScore = (assignment_id) => {
                    return new Promise((resolve, reject) => {
                        Submission.find({'assignment':assignment_id,'student':student}, function(innner_db_error, submissions) {
                            if (innner_db_error){
                                callback({"success":false,"message":"Something went wrong"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong"});
                            }
                            else{
                                if (submissions.length <= 0) {
                                    return resolve(null)
                                }
                                else {
                                    let max_grade = 0;
                                    for(let i = 0;i<submissions.length;i++){
                                        let submission_obj = submissions[i]
                                        if(submission_obj.grades > max_grade){
                                            max_grade = submission_obj.grades
                                        }
                                    }
                                    return resolve(max_grade)
                                }
                            }
                        });
    
                    })
                }
                let index = 0;
                let loopArray = (arr) => {
                    let proceed = () => {
                        index++;
                        if (index < arr.length) {
                            loopArray(arr);
                        } else {
                            // console.log("Final Response\n",arr);
                            callback(null,{ "success": true, "data": output })
                            // return res.status(200).json({ "success": true, "data": output })
                        }
                    }
                    let elem = arr[index];
                    studentAssignmentScore(elem.id).then(details => {
                        // console.log("Got " + index + " Response");
                        // elem['score_obtained'] = details
                        let temp = {}
                        temp["title"] = elem.title
                        temp["due"] = elem.due_date
                        temp["out_of"] = elem.points
                        temp["score_obtained"] = details
                        output.push(temp)
                        proceed();
                    }).catch(e => {
                        callback(e,null)
                        // res.status(500).send(e);
                        // return;
                    })

                };
                // console.log(quizes.length)
                if(assignments.length > 0){
                    loopArray(assignments)
                }
                else{
                    callback(null,{ "success": true, "data": [] })
                    // return res.status(200).json({ "success": true, "data": [] })
                }
            }
        });


    }
    catch(error){
        callback({"success":false,"message":"Something went wrong, Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

let quizGradeGet = (user,msg,course,callback) => {
    try {
        let output = [];
        let student = user.id
        
        Quiz.find({'course':course}, function(db_error, quizes) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                let studentQuizScore = (quiz_id) => {
                    return new Promise((resolve, reject) => {
                        UserQuiz.find({'quiz':quiz_id,'user':user.id}, function(db_inner_error, inner_result) {
                            if (db_inner_error){
                                callback({"success":false,"message":"Something went wrong"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong"});
                            }
                            else{
                                if (inner_result.length <= 0) {
                                    return resolve(null)
                                }
                                else {
                                    return resolve(inner_result[0].score)
                                }
                            }
                        });

                    })
                }
                let index = 0;
                let loopArray = (arr) => {
                    let proceed = () => {
                        index++;
                        if (index < arr.length) {
                            loopArray(arr);
                        } else {
                            // console.log("Final Response\n",arr);
                            callback(null,{ "success": true, "data": output })
                            // return res.status(200).json({ "success": true, "data": output })
                        }
                    }
                    let elem = arr[index];
                    studentQuizScore(elem.id).then(details => {
                        // console.log("Got " + index + " Response");
                        // elem['score_obtained'] = details
                        let temp = {}
                        temp["title"] = elem.title
                        temp["due"] = elem.end_date
                        temp["out_of"] = elem.marks
                        temp["score_obtained"] = details
                        output.push(temp)
                        proceed();
                    }).catch(e => {
                        callback({"success":false,"message":"Something went wrong, Please try again"},null)
                        // res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
                        // return res;
                    })

                };
                // console.log(quizes.length > 0)
                if(quizes.length > 0){
                    loopArray(quizes)
                }
                else{
                    callback(null,{ "success": true, "data": [] })
                    // return res.status(200).json({ "success": true, "data": [] })
                }
            }
        });
    }
    catch(error){
        callback({"success":false,"message":"Something went wrong, Please try again"},null)
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
    
    switch (type) {
		case 'assignmentGradeGet':
            assignmentGradeGet(user,msg,course,callback);
            break;
        case 'quizGradeGet' :
            quizGradeGet(user,msg,course,callback);
            break;
	}

}

exports.handle_request = handle_request;