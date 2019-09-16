let call_kafka = require("../utils/kafka_common")

module.exports = {

    announcementPost : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"announcementPost",user:req.user}) 
    },

    announcementGet : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"announcementGet",user:req.user,course:req.param("course")})   
    }
}
