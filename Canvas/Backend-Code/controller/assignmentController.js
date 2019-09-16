let call_kafka = require("../utils/kafka_common")

module.exports = {

    assignmentCreate: (req, res) => {        
        call_kafka(req, res, 'course',{payload: req.body,type:"assignmentCreate",user:req.user})
    },

    assignmentList: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"assignmentList",user:req.user,course:req.param("course")})
    },

    assignmentRetrieve: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"assignmentRetrieve",user:req.user,course:req.param("course"),assignment:req.param("assignment")})
    },

    assignmentSubmit: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"assignmentSubmit",user:req.user,course:req.param("course"),assignment:req.param("assignment"),file:req.file})
    },

    assignmentSubmissionFiles: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"assignmentSubmissionFiles",user:req.user,course:req.param("course"),assignment:req.param("assignment")})
    },

    assignmentSubmissionList: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"assignmentSubmissionList",user:req.user,course:req.param("course"),assignment:req.param("assignment")})
    },

}
