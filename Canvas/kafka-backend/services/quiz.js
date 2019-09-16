let Joi = require('joi');
let Quiz = require('../models/quiz')
let QuizQuestions = require('../models/quizQuestions')
let UserQuiz = require('../models/userQuiz')

let quizCreate = (user,msg,course,quiz,callback) => {
    console.log("Request to create quiz",msg)
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        max_marks: Joi.number().integer().min(0),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        course: Joi.string().required(),
    });
    try {
        let course = msg.course
        let title = msg.title
        let description = msg.description
        let start_date = msg.start_date
        let end_date = msg.end_date
        let question_list = msg.question_choice_list
        let marks = msg.marks
        Joi.validate({ course: course, description: description, title: title, start_date: start_date, end_date: end_date, max_marks: marks }, schema, (err, value) => {
            if (err) {
                callback({ "success": false, "message": "Invalid Input! Please try again." },null)
                // res.status(500).json({ "success": false, "message": "Invalid Input! Please try again." });
                // return res;
            }
            
            let db_obj = new Quiz({ course: course, title: title, description: description, start_date: start_date, end_date: end_date, marks: marks })

            db_obj.save().then(quiz_obj => {
                if(quiz_obj === null){
                    console.log("Quiz object not created");
                    callback({ "success": false, "message": "Invalid Input! Please try again." },null)
                    // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
                }else{

                    console.log("Created quiz",quiz_obj)

                    let insertQuestion = (p) => {
                        return new Promise((resolve, reject) => {
                            let quiz_question_obj = new QuizQuestions(p)
                            quiz_question_obj.save().then(created_quiz_question => {
                                console.log("Question created successully")
                                resolve("done");
                                return;
                            }).catch(inner_err => {
                                console.log("ERROR - ",inner_err)
                                reject({ "success": false, "message": "Something went wrong! Please try again" });
                                callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                                // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
                            });
                        })
                    }

                    question_list.forEach(async function (elem) {
                        console.log("INSERTING QUESTION")
                        let done = await insertQuestion({ quiz: quiz_obj.id, question: elem.question, answer: elem.answer, option1: elem.choice1, option2: elem.choice2, option3: elem.choice3, option4: elem.choice4 }).catch((e => {
                            callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                            // res.status(500).send(e);
                            // return;
                        }));
                        console.log(done);

                    });
                    callback(null,{ "success": true, "message": "Quiz created successfully." })
                    // return res.status(200).json({ "success": true, "message": "Quiz created successfully." })
                }
            }).catch(err => {
                console.log("Error",err);
                callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
            })

        })
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let quizStudentList = (user,msg,course,quiz,callback) => {
    
    try {
        let output = []
        Quiz.find({'course':course}, function(err, quizes) {
            if (err){
                console.log("Error",err);
                callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }else{
                console.log("quizes",quizes);

                let studentQuizScore = (quiz_id) => {
                    return new Promise((resolve, reject) => {
                        UserQuiz.find({'quiz':quiz_id,'user':user.id}, function(db_inner_error, inner_result) {
                            if (db_inner_error){
                                console.log("Error",db_inner_error);
                                callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }else {
                                if (inner_result.length <= 0) {
                                    return resolve({ "taken": false, "score_obtained": null })
                                }
                                else {
                                    return resolve({ "taken": true, "score_obtained": inner_result[0].score })
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
                            console.log("Quiz response \n",output);
                            callback(null,{ "success": true, "data": output })
                            // return res.status(200).json({ "success": true, "data": output })
                        }
                    }
                    let elem = arr[index];
                    // console.log("----index----",index)
                    // console.log("------elem----",elem)
                    let temp = Object.assign({},elem)
                    temp = temp._doc
                    studentQuizScore(elem.id).then(details => {
                        // console.log("Got " + index + " Response");
                        // console.log("------details-----",details)
                        temp['taken'] = details['taken'];
                        temp['score_obtained'] = details['score_obtained'];
                        output.push(temp)
                        proceed();
                    }).catch(e => {
                        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                        // res.status(500).send(e);
                        // return;
                    })

                };
                // console.log(quizes.length)
                if(quizes.length > 0){
                    loopArray(quizes)
                }   
                else{
                    callback(null,{ "success": true, "data": output })
                    // return res.status(200).json({ "success": true, "data": output })
                }   
            }
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let quizList = (user,msg,course,quiz,callback) => {
    
    try {
        Quiz.find({'course':course}, function(err, quizes) {
            if (err){quizStudentList
                console.log("Error",err);
                callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }else{
                callback(null,{ "success": true, data: quizes })
                // return res.status(200).json({ "success": true, data: quizes })
            }
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let quizDetail = (user,msg,course,quiz,callback) => {

    try {
        Quiz.findOne({'id':quiz}, function(db_error, quiz_obj) {
            if (db_error){
                console.log("Error",db_error);
                callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }else{
                if(quiz_obj === null){
                    callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }

                let output = Object.assign({},quiz_obj)

                QuizQuestions.find({'quiz':quiz_obj.id}, function(inner_db_error, inner_result) {
                    if (inner_db_error){
                        console.log("Error",inner_db_error);
                        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                    }
                    console.log(inner_result)
                    output["ques_choice"] = inner_result
                    callback(null,{ "success": true, "data": output })
                    // return res.status(200).json({ "success": true, "data": output })
                });
            }
        });
    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
        // return res.status(500).json({ "success": false, "message": "Something went wrong, Please try again" });
    }
}

let quizSubmit = (user,msg,course,quiz,callback) => {

    try{
        console.log(msg)
        let question_answer_list = msg.data
        let per_question_points = 0

        Quiz.findOne({'id':quiz}, function(db_error, quiz_obj) {
            if (db_error){
                console.log("Error",db_error);
                callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }else{
                per_question_points = quiz_obj.marks
                QuizQuestions.find({'quiz':quiz_obj.id}, function(inner_db_error, inner_result) {
                    if (inner_db_error){
                        console.log("Error",inner_db_error);
                        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                    }
                    else{
                        let user_points = 0
                        per_question_points = per_question_points / inner_result.length
                        for(let i=0;i<question_answer_list.length;i++){
                            for(let j=0;j<inner_result.length;j++){
                                if(question_answer_list[i].question == inner_result[j].question){
                                    let corect_answer = null
                                    if(inner_result[j].answer.toLowerCase() == "a"){
                                        corect_answer = inner_result[j].option1
                                    }
                                    else if(inner_result[j].answer.toLowerCase() == "b"){
                                        corect_answer = inner_result[j].option2
                                    }
                                    else if(inner_result[j].answer.toLowerCase() == "c"){
                                        corect_answer = inner_result[j].option3
                                    }
                                    else{
                                        corect_answer = inner_result[j].option4
                                    }
                                    if (question_answer_list[i].answer == corect_answer){
                                        user_points += per_question_points
                                    }
                                }
                            }
                        }
                        console.log(user_points)
                        let db_obj = new UserQuiz({quiz:quiz,user:user.id,score:user_points})
                        db_obj.save().then(user_ques_success =>{
                            console.log(user_ques_success)
                            // return res.status(200).json({ "success": true})
                            callback(null,{ "success": true})
                        }).catch(user_ques_err => {
                            console.log(user_ques_err)
                            callback({ "success": false, "message": "Something went wrong! Please try again" },null)
                            // return res.status(500).json({ "success": false, "message": "Something went wrong! Please try again" });
                        });
                    }
                });
            }
        });

    }
    catch (error) {
        console.log("catch", error)
        callback({ "success": false, "message": "Something went wrong! Please try again" },null)
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
    quiz = data.quiz
    
    switch (type) {
		case 'quizCreate':
            quizCreate(user,msg,course,quiz,callback);
            break;
        case 'quizDetail':
            quizDetail(user,msg,course,quiz,callback);
            break;
        case 'quizList':
            quizList(user,msg,course,quiz,callback);
            break;
        case 'quizStudentList':
            quizStudentList(user,msg,course,quiz,callback);
            break;
        case 'quizSubmit':
            quizSubmit(user,msg,course,quiz,callback);
            break;
        
	}

}

exports.handle_request = handle_request;