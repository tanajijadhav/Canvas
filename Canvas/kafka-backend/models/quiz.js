var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({
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
    title: {
        type: String, 
        required: true, 
        trim:true,
    },
    description: {
        type: String, 
        required: true, 
        trim:true,
    },
    start_date: {
        type : Date, 
        required: true, 
    },
    end_date: {
        type : Date, 
        required: true, 
    },
    created_on: {
        type : Date, 
        default: Date.now,
    },
    marks: {
        type: Number, 
        required: true, 
    },
});

module.exports = mongoose.model('Quiz', quizSchema);