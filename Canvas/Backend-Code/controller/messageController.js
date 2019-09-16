let call_kafka = require("../utils/kafka_common")

module.exports = {

    messagePost : (req,res) => {
        call_kafka(req, res, 'message',{payload: req.body,type:"messagePost",user:req.user})
    },

    messageChainPost : (req,res) => {
        call_kafka(req, res, 'message',{payload: req.body,type:"messageChainPost",user:req.user})
    },

    messageGet : (req,res) => {
        call_kafka(req, res, 'message',{payload: req.body,type:"messageGet",user:req.user})
    },

}
