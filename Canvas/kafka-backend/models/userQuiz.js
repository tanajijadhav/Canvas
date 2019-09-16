var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userQuizSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true,
    },
    quiz: {
        type: String, 
        required: true, 
        trim:true
    },
    user: {
        type: String, 
        required: true, 
        trim:true
    },
    score: {
        type: String, 
        required: true, 
        trim:true
    },
});

module.exports = mongoose.model('UserQuiz', userQuizSchema);