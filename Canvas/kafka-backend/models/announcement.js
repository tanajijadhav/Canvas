var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let announcementSchema = new Schema({
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
    created_by: {
        type: String, 
        required: true, 
        trim:true
    },
    message : {
        type: String, 
        required: true, 
        trim:true
    },
    title : {
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

module.exports = mongoose.model('Announcement', announcementSchema);