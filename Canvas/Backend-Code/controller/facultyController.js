let call_kafka = require("../utils/kafka_common")

module.exports = {

    facultyLandingGet : (req,res) => {
        call_kafka(req, res, 'user',{payload: req.body,type:"facultyLandingGet",user:req.user}) 
    }

}
