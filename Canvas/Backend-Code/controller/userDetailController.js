let call_kafka = require("../utils/kafka_common")

module.exports = {
    UserDetail : (req, res) => {
        call_kafka(req, res, 'user',{payload: req.body,type:"UserDetail",user:req.user}) 
    },
}
