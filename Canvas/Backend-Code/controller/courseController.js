let call_kafka = require("../utils/kafka_common")

module.exports = {

    coursePost : (req,res) => {   
        call_kafka(req, res, 'course',{payload: req.body,type:"coursePost",user:req.user})
    },

    courseFilter : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"courseFilter",user:req.user})
    },

    enrollCourse : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"enrollCourse",user:req.user})
    },

    dropCourse : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"dropCourse",user:req.user})
    },

    waitlistCourse : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"waitlistCourse",user:req.user})
    },

    courseDetail : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"courseDetail",user:req.user})
    },
}
