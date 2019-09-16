var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let submissionSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true, 
    },
    file: {
        type: String, 
        required: true, 
        trim:true
    },
    filename: {
        type: String, 
        required: true, 
        trim:true
    },
    grades: {
        type: Number, 
        required: true, 
        default : 0,
    },
    created_on: {
        type : Date, 
        default: Date.now,
        required: true, 
    },
    student: {
        type: String, 
        required: true, 
        trim:true
    },
    assignment: {
        type: String, 
        required: true, 
        trim:true
    },
});

module.exports = mongoose.model('Submission', submissionSchema);