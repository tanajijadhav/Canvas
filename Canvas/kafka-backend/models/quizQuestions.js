var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizQuestionSchema = new Schema({
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
    question: {
        type: String, 
        required: true, 
        trim:true,
    },
    answer: {
        type: String, 
        required: true, 
        trim:true,
    },
    option1: {
        type: String, 
        required: true, 
        trim:true,
    },
    option2: {
        type: String, 
        required: true, 
        trim:true,
    },
    option3: {
        type: String, 
        required: true, 
        trim:true,
    },
    option4: {
        type: String, 
        required: true, 
        trim:true,
    },
});

module.exports = mongoose.model('QuizQuestions', quizQuestionSchema);