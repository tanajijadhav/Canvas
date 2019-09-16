let call_kafka = require("../utils/kafka_common")

module.exports = {

    peopleGet : (req,res) => {
        call_kafka(req, res, 'user',{payload: req.body,type:"peopleGet",user:req.user,course:req.param("course"),page:req.param("page")})
    },

    // non paginated
    allpeopleGet : (req,res) => {
        call_kafka(req, res, 'user',{payload: req.body,type:"allpeopleGet",user:req.user,course:req.param("course")})
    }

}
