let call_kafka = require("../utils/kafka_common")

module.exports = {

    assignmentGradeGet : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"assignmentGradeGet",user:req.user,course:req.param("course")})
    },

    quizGradeGet : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"quizGradeGet",user:req.user,course:req.param("course")})
    },

}
