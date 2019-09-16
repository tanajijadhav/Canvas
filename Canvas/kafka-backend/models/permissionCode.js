var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let permissionCodeSchema = new Schema({
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
    code_number: {
        type: String, 
        required: true, 
        trim:true,
    },
    created_on: {
        type : Date, 
        default: Date.now,
    },
    is_used : {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('PermissionCode', permissionCodeSchema);