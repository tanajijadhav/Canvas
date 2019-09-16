var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let enrollmentSchema = new Schema({
    id : { 
        type: String, 
        required: true,
        default:uuid.v1,
        unique: true,
    },
    student : {
        type: String, 
        required: true, 
        trim:true
    },
    course: {
        type: String, 
        required: true, 
        trim:true
    },
    status: {
        type: String, 
        trim:true,
        max : 20,
    },
    is_active : {
        type: Boolean,
        default:true
    }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);