let call_kafka = require("../utils/kafka_common")

module.exports = {

    studentLandingGet : (req,res) => {
        call_kafka(req, res, 'user',{payload: req.body,type:"studentLandingGet",user:req.user}) 
    }

}
