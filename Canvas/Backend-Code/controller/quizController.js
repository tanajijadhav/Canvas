let call_kafka = require("../utils/kafka_common")

module.exports = {

    quizCreate: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"quizCreate",user:req.user})
    },

    quizStudentList: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"quizStudentList",user:req.user,course:req.param("course")})
    },

    quizList: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"quizList",user:req.user,course:req.param("course")})
    },

    quizDetail: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"quizDetail",user:req.user,quiz : req.param("quiz")})
    },

    quizSubmit : (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"quizSubmit",user:req.user,quiz : req.param("quiz")})
    }
}
