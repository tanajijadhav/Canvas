let Joi = require('joi');
let User = require("../models/user")
let Message = require("../models/message")
let Course = require("../models/course")


let messagePost = (user,msg,callback) => {
    console.log("Message post request from frontend \n",msg)
    const schema = Joi.object().keys({
        course : Joi.string().required(),
        receiver : Joi.string().required(),
        message: Joi.string().required(),
        subject : Joi.string().required(),
    });
    try {
        let course = msg.course
        let message = msg.message
        let subject = msg.subject
        let receiver = msg.receiver
        Joi.validate({course:course,message:message,subject:subject,receiver:receiver}, schema, (err, value) => {
            if (err) {
                callback({"success":false,"message":"Invalid Input! Please try again."},null)
                // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."});
                // return res;
            }

            let message_obj = new Message({course:course,sender:user.id,receiver:receiver,subject:subject})
            message_obj.message_chain.push({sender:user.id,receiver:receiver,message:message});
            message_obj.save().then(result => {
                console.log("Message object created\n",result)   
                callback(null,{"success":true})
                // return res.status(200).json({"success":true})
            }).catch(err => {
                console.log("Error",err);
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            })
        })
    }
    catch(error){
        console.log("catch",error)
        callback({"success":false,"message":"Something went wrong, Please try again"},null)
        //{"success":false,"message":"Something went wrong, Please try again"} return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}


let messageChainPost = (user,msg,callback) => {
    console.log("request for messageChainPost\n",msg)
    const schema = Joi.object().keys({
        message_id : Joi.string().required(),
        receiver : Joi.string().required(),
        message: Joi.string().required(),
    });
    try {
        let message = msg.message
        let receiver = msg.receiver
        let message_id = msg.message_id
        Joi.validate({message:message,receiver:receiver,message_id:message_id}, schema, (err, value) => {
            if (err) {
                callback({"success":false,"message":"Invalid Input! Please try again."},null)
                // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."});
                // return res;
            }

            receiver_list = receiver.split(",")
            if(receiver_list[0] == user.id){
                receiver = receiver_list[1]
            }
            else{
                receiver = receiver_list[0]
            }

            console.log("receiver",receiver)

            Message.findOne({id:message_id}, function(db_error, message_obj) {
                if (db_error){
                    callback({"success":false,"message":"Something went wrong"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong"});
                }
                if (message_obj === null){
                    callback({"success":false,"message":"Something went wrong"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong"});
                }

                message_obj.message_chain.push({sender:user.id,receiver:receiver,message:message});
                message_obj.save().then(result => {
                    console.log("Message reply saved\n",result)   
                    callback(null,{"success":true})
                    // return res.status(200).json({"success":true})
                }).catch(err => {
                    console.log("Error",err);
                    callback({"success":false,"message":"Something went wrong! Please try again"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                })
            });

        })
    }
    catch(error){
        console.log("catch",error)
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

let messageGet = (user,msg,callback) => {
    try {
        let course_detail = (temp) => {
            return new Promise((resolve,reject) => {
                Course.findOne({id:temp.course}, function(db_error, course_obj) {
                    temp.course = {
                        id : course_obj.id,
                        name : course_obj.name,
                        course_id : course_obj.course_id,
                    }
                    // console.log("sender_detail",temp)
                    resolve(temp);
                })
            });
        }

        let sender_detail = (temp) => {
            console.log("sender",temp.sender)
            return new Promise((resolve,reject) => {
                User.findOne({id:temp.sender}, function(db_error, sender_obj) {
                    console.log("sender_obj",sender_obj)
                    if (sender_obj.profile_pic){
                        sender_obj.profile_pic = ("http://18.191.237.120:3001/"+sender_obj.profile_pic)
                    }
                    else{
                        sender_obj.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                    }
                    temp.sender = {
                        id : sender_obj.id,
                        name : sender_obj.name,
                        email : sender_obj.email,
                        profile_pic : sender_obj.profile_pic,
                    }
                    // console.log("sender_detail",temp)
                    resolve(temp);
                })
            });
        }

        let receiver_detail = (temp) => {
            return new Promise((resolve,reject) => {
                User.findOne({id:temp.receiver}, function(db_error, receiver_obj) {
                    if (receiver_obj.profile_pic){
                        receiver_obj.profile_pic = ("http://18.191.237.120:3001/"+receiver_obj.profile_pic)
                    }
                    else{
                        receiver_obj.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                    }
                    temp.receiver = {
                        id : receiver_obj.id,
                        name : receiver_obj.name,
                        email : receiver_obj.email,
                        profile_pic : receiver_obj.profile_pic,
                    }
                    // console.log("receiver_detail",temp)
                    resolve(temp);
                })
            })
        }

        let output = []

        Message.find({$or : [{"sender":user.id},{"receiver":user.id}]}, async function(db_error, messages) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            
            messages = messages.reverse();

            console.log("query result",messages)

            for (let i=0;i<messages.length;i++){
                let temp = Object.assign({},messages[i]) 
                temp = temp._doc
                temp = await course_detail(temp)
                temp = await sender_detail(temp)
                temp = await receiver_detail(temp)
                let message_chain_output = []
                temp.message_chain = temp.message_chain.reverse()
                for(let j=0;j<temp.message_chain.length;j++){
                    let innner_temp = Object.assign({},temp.message_chain[j]) 
                    innner_temp = innner_temp._doc
                    innner_temp = await sender_detail(innner_temp)
                    innner_temp = await receiver_detail(innner_temp)
                    message_chain_output.push(innner_temp)
                }
                temp.message_chain = message_chain_output
                output.push(temp)
            }
            console.log("List of messages\n",messages)
            callback(null,{"success":true,"data":output})
            // return res.status(200).json({"success":true,"data":output}); 
        });

    }
    catch(error){
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}




function handle_request(data,callback){

    msg = data.msg
    type = data.type
    user = data.user
    course = data.course
    assignment = data.assignment
    file = data.file
    
    switch (type) {
		case 'messagePost':
            messagePost(user,msg,callback);
            break;
        case 'messageChainPost' :
            messageChainPost(user,msg,callback);
            break;
        case 'messageGet' :
            messageGet(user,msg,callback);
            break;
	}

}

exports.handle_request = handle_request;