let call_kafka = require("../utils/kafka_common")

module.exports = {

    permissionCodeGenerate: (req, res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"permissionCodeGenerate",user:req.user,course:req.param("course")})
    },

    permissionCodeList : (req,res) => {
        call_kafka(req, res, 'course',{payload: req.body,type:"permissionCodeList",user:req.user,course:req.param("course")})
    }

}