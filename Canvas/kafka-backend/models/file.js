var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fileSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true,
    },
    uploaded_by : {
        type: String, 
        required: true, 
        trim:true
    },
    course: {
        type: String, 
        required: true, 
        trim:true
    },
    file: {
        type: String, 
        trim:true,
        required : true,
    },
    filename : {
        type: String, 
        trim:true,
        required : true,
    },
    uploaded_on: {
        type : Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model('Files', fileSchema);