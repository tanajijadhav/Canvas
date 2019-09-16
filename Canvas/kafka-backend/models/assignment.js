var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let assignmentSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true,
    },
    title: {
        type: String, 
        required: true, 
        trim:true
    },
    body: {
        type: String, 
        required: true, 
        trim:true
    },
    points: {
        type: Number, 
        required: true, 
    },
    created_on: {
        type : Date, 
        default: Date.now,
        required: true, 
    },
    due_date: {
        type : Date, 
        required: true, 
    },
    course: {
        type: String, 
        required: true, 
        trim:true
    },
});

module.exports = mongoose.model('Assignment', assignmentSchema);