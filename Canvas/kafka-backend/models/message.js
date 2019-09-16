var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var message_chain= new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true,
    },
    sender: {
        type: String, 
        required: true, 
        trim:true
    },
    receiver: {
        type: String, 
        required: true, 
        trim:true
    },
    message : {
        type: String, 
        required: true, 
        trim:true
    },
    created_on : {
        type : Date, 
        default: Date.now,
        required: true,
    },
});


let messageSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true,
    },
    course: {
        type: String, 
        required: true, 
        trim:true
    },
    sender: {
        type: String, 
        required: true, 
        trim:true
    },
    receiver: {
        type: String, 
        required: true, 
        trim:true
    },
    subject : {
        type: String, 
        required: true, 
        trim:true
    },
    message_chain : [message_chain],
});

module.exports = mongoose.model('Message', messageSchema);