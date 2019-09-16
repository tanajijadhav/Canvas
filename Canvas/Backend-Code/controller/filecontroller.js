let call_kafka = require("../utils/kafka_common")

module.exports = {

    filePost : (req,res) => {
        console.log("------file upload api--------\n",req.file)
        call_kafka(req, res, 'course',{payload: req.body,type:"filePost",user:req.user,file:req.file,course:req.param("course")})
    },

    fileGet : (req,res) => {
        console.log("------file get api--------\n")
        call_kafka(req, res, 'course',{payload: req.body,type:"fileGet",user:req.user,course:req.param("course")})
    }
}
