let call_kafka = require("../utils/kafka_common")

module.exports = {

    submissionRetrieve: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"submissionRetrieve",user:req.user,submission:req.param("submission_id")}) 
    },

    gradeSubmission: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"gradeSubmission",user:req.user,submission:req.param("submission_id")}) 
    },
}
