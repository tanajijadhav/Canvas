var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true,
    },
    course_id: {
        type: String, 
        required: true, 
        trim:true,
        max: 30,
    },
    name: {
        type: String, 
        required: true, 
        trim:true,
        max: 100,
    },
    dept: {
        type: String, 
        required: true, 
        trim:true,
        max: 50,
    },
    description: {
        type: String, 
        trim:true,
        max: 100,
    },
    room: {
        type: String, 
        trim:true,
        max: 30,
    },
    capacity: {
        type : Number, 
        default : 0,
    },
    waitlist_capacity: {
        type : Number, 
        default : 0,
    },
    current_capacity: {
        type : Number, 
        default : 0,
    },
    current_waitlist: {
        type : Number, 
        default : 0,
    },
    term: {
        type: String, 
        trim:true,
        max: 10,
    },
    created_by: {
        type: String, 
        required: true, 
        trim:true
    },
});

module.exports = mongoose.model('Course', courseSchema);