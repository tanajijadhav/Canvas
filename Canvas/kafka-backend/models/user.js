var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true, 
    },
    name: {
        type: String, 
        required: true, 
        max: 100,
        trim:true,
    },
    email: {
        type: String, 
        required: true, 
        max: 30,
        unique: true,
        trim:true,
    },
    password: {
        type: String, 
        required: true, 
        max: 100,
        trim:true
    },
    phone_number: {
        type: String, 
        required: false, 
        max: 30,
        trim:true,
        default : '',
    },
    about_me: {
        type: String, 
        required: false, 
        max: 200,
        trim:true,
        default : '',
    },
    city: {
        type: String, 
        required: false, 
        max: 30,
        trim:true,
        default : '',
    },
    country: {
        type: String, 
        required: false, 
        max: 30,
        trim:true
    },
    company: {
        type: String, 
        required: false, 
        max: 30,
        trim:true,
        default : '',
    },
    school: {
        type: String, 
        required: false, 
        max: 30,
        trim:true,
        default : '',
    },
    hometown: {
        type: String, 
        required: false, 
        max: 30,
        trim:true,
        default : '',
    },
    language: {
        type: String, 
        required: false, 
        max: 50,
        trim:true,
        default : '',
    },
    gender: {
        type: String, 
        required: false, 
        max: 1,
        trim:true,
        default : '',
    },
    is_faculty: {
        type: Boolean,
        default:false
    },
    profile_pic: {
        type: String, 
        required: false,
        trim:true,
        default : '',
    },
});

module.exports = mongoose.model('User', userSchema);