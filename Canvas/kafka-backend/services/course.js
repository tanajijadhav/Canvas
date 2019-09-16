let Joi = require('joi');
let Course = require("../models/course")
let Enrollment = require("../models/enrollment")
let PermissionCode = require("../models/permissionCode")

let courseDetail = (user, msg, callback) => {
    try {
        let course_id = msg.course_id
        Course.findOne({'id':course_id}, function(err, course_obj) {
            if (err){
                console.log("Error",err);
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            else{
                if (course_obj === null){
                    callback({"success":false,"message":"Something went wrong! Please try again"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }
                else{
                    delete course_obj.id
                    callback(null,{data:course_obj})
                }
            }
        })
        
    }
    catch(error){
        console.log("Error",error);
        callback({"success":false,"message":"Something went wrong, Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

let waitlistCourse = (user, msg, callback) => {
    console.log("Request for waitlisting a course\n",msg)
    try {
        var id = msg.course_primary_id
        var user_id = user.id
        
        Course.findOne({'id':id}, function(err, course_obj) {
            if (err){
                console.log("Error",err);
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            else{
                if (course_obj === null){
                    callback({"success":false,"message":"Something went wrong! Please try again"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }   
                let permission_code = msg.permission_code
                if(permission_code){
                    console.log("Permission code passed, so checking whether permission code is valid and the enrolling")
                    PermissionCode.findOne({"course":course_obj.id,"code_number":permission_code},  function(permission_err, permission_obj) {
                        if (permission_err){
                            console.log("Error",permission_err);
                            callback({"success":false,"message":"Something went wrong! Please try again"},null)
                            // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                        }
                        else{
                            console.log("Permission code\n",permission_obj)
                            if(permission_obj == null){
                                console.log("Permission code not found, returning 500")
                                callback({"success":false,"message":"Permission code not found"},null)
                                // return res.status(500).json({"success":false,"message":"Permission code not found"});
                            }
                            else{    
                                if (permission_obj.is_used){
                                    console.log("Permission code already used, so student not enrolled.")
                                    callback({"success":false,"message":"Permission code already used."},null)
                                    // return res.status(500).json({"success":false,"message":"Permission code already used."});
                                }
                                else{
                                    let enrollment_obj = new Enrollment({course:course_obj.id,student:user_id,status:"enrolled"})
                                    enrollment_obj.save().then(result => {
                                        console.log("Permission code is valid, so student has been enrolled")
                                        course_obj.current_capacity += 1
                                        course_obj.save().then(course_update_result => {
                                            permission_obj.is_used = true
                                            permission_obj.save().then(updated_permission_obj => {
                                                console.log("course capacity updated and permission code is_used updated")
                                                console.log("returning success to frontend")
                                                callback(null,{"success":true,"message":"Your are enrolled successfully"})
                                                // return res.status(200).json({"success":true,"message":"Your are enrolled successfully"});
                                            }).catch(updated_permission_error => {
                                                console.log("ERROR- Failed to updated is_used of Permission Code to true",updated_permission_error)
                                                callback(null,{"success":true,"message":"Your are enrolled successfully"})
                                                // return res.status(200).json({"success":true,"message":"Your are enrolled successfully"});
                                            })
                                        }).catch(course_update_err => {
                                            console.log("Error",course_update_err);
                                            callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                            // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                        });
                                    }).catch(inner_err => {
                                        console.log("Error",inner_err);
                                        callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                    })
                                }
                            }
                        }
                    });
                }
                else{
                    if(course_obj.waitlist_capacity <= course_obj.current_waitlist){
                        callback({"success":false,"message":"Something went wrong! Please try again"},null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                    }
                    else{
                        let enrollment_obj = new Enrollment({course:course_obj.id,student:user_id,status:"waitlist"})
                        enrollment_obj.save().then(enrollment_success => {
                            course_obj.current_waitlist += 1
                            course_obj.save().then(course_update_result => {
                                console.log("Current Waitlist count increased")
                                callback(null,{"success":true,"message":"Your are waitlisted successfully"})
                                // return res.status(200).json({"success":true,"message":"Your are waitlisted successfully"});
                            }).catch(course_update_err => {
                                console.log("Error",course_update_err);
                                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            });
                        }).catch(enrollment_error => {
                            console.log("Error",enrollment_error);
                            callback({"success":false,"message":"Something went wrong! Please try again"},null)
                            // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                        })
                    }
                }
            }
        });
        
    }
    catch(error){
        console.log("Error",error);
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}


let dropCourse = (user, msg, callback) => {

    console.log("Request data from frontend for droping a course\n",msg);

    try {
        var id = msg.course_primary_id
        if (msg.from_faculty){
            // faculty kicking out the student
            var user_id = msg.student_id
        }
        else{
            // student dropping by himself
            var user_id = user.id
        }

        Course.find({'id':id}, function(err, result) {
            if (err){
                console.log("Error",err);
                callback({"success":false,"message":"Something went wrong! Please try again"},null);
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            else{
                if (result.length == 0){
                    callback({"success":false,"message":"Something went wrong! Please try again"},null);
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }
                else{
                    let course_obj = result[0]
                    Enrollment.findOne({'student':user_id,course:course_obj.id,is_active:true}, function(inner_err, enrollment_obj) {
                        if (inner_err){
                            console.log("Error",inner_err);
                            callback({"success":false,"message":"Something went wrong! Please try again"},null);
                            // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                        }
                        else{
                            if (enrollment_obj === null){
                                callback({"success":false,"message":"Something went wrong! Please try again"},null);
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            enrollment_obj.is_active = false
                            enrollment_obj.save().then(updated_enrollment_obj => {
                                console.log("Student dropped from course",updated_enrollment_obj)
                                if(course_obj.current_waitlist == 0){
                                    if (course_obj.current_capacity <= 0){
                                        course_obj.current_capacity = 0
                                    }
                                    else{
                                        course_obj.current_capacity -= 1
                                    }
                                    course_obj.save().then(course_updated_obj => {
                                        console.log("No waitlisted student")
                                        console.log("So Capacity count descreased")
                                        callback(null,{"success":true});
                                        // return res.status(200).json({"success":true});
                                    }).catch(course_update_err => {
                                        callback({"success":false,"message":"Something went wrong! Please try again"},null);
                                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                    })
                                }
                                else{
                                    if(course_obj.current_waitlist <= 0){
                                        course_obj.current_waitlist = 0
                                    }
                                    else{
                                        course_obj.current_waitlist -= 1
                                    }
                                    course_obj.save().then(course_updated_obj => {
                                        console.log("waitlisted student has been enrolled in course.")
                                        console.log("Current Waitlist count descreased")
                                        Enrollment.findOne({'status':'waitlist',course:course_obj.id,is_active:true}, function(inner_enrollment_err, inner_enrollment_obj) {
                                            if (inner_enrollment_err){
                                                console.log("Error",inner_enrollment_err);
                                                callback({"success":false,"message":"Something went wrong! Please try again"},null);
                                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                            }
                                            else{
                                                if(inner_enrollment_obj.length == 0){
                                                    callback(null,{"success":true});
                                                    // return res.status(200).json({"success":true});
                                                }
                                                else{
                                                    inner_enrollment_obj.status = "enrolled"
                                                    inner_enrollment_obj.save().then(return_success => {
                                                        console.log("Sending success 200 to frontend")
                                                        callback(null,{"success":true});
                                                        // return res.status(200).json({"success":true});
                                                    }).catch(return_error => {
                                                        console.log("ERROR - Waitlisting not added in the course ",return_error)
                                                        callback(null,{"success":true});
                                                        // return res.status(200).json({"success":true});
                                                    });
                                                }
                                            }
                                        });
                                    }).catch(course_update_err => {
                                        callback({"success":false,"message":"Something went wrong! Please try again"},null);
                                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                    })
                                }
                            }).catch(updated_enrollment_err => {
                                callback({"success":false,"message":"Something went wrong! Please try again"},null);
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            });
                        }
                    });
                }
            }
        });
                    
    }
    catch(error){
        console.log("Error",error);
        callback({"success":false,"message":"Something went wrong! Please try again"},null);
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}


let enrollCourse = (user, msg, callback) => {

    console.log("Data from frontend for enrolling -\n",msg);

    try {
        var id = msg.course_primary_id
        var user_id = user.id

        Course.find({'id':id}, function(err, result) {
            if (err){
                callback({"success":false,"message":"Something went wrong"}, null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                if (result.length == 0){
                    callback({"success":false,"message":"Something went wrong"}, null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong"});
                }
                else{
                    let course_obj = result[0]
                    console.log("Checking if the course has capacity to enroll student")
                    if(course_obj.capacity <= course_obj.current_capacity){
                        callback({"success":false,"message":"Course already full"}, null)
                        // return res.status(500).json({"success":false,"message":"Course already full"});
                    }
                    else{
                        let enrollment_obj = new Enrollment({course:course_obj.id,student:user_id,status:"enrolled"})
                        enrollment_obj.save().then(inner_result => {
                            course_obj.current_capacity += 1
                            course_obj.save().then(course_update_result => {
                                console.log("Course Current Capacity Incremented\n",course_update_result)
                                console.log("\n\nReturning success to frontend\n\n")
                                callback(null,{"success":true,"message":"Your are enrolled successfully"})
                                // return res.status(200).json({"success":true,"message":"Your are enrolled successfully"});
                            }).catch(course_update_err => {
                                console.log("Error",course_update_err);
                                callback({"success":false,"message":"Something went wrong! Please try again"}, null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            });
                        }).catch(inner_err => {
                            console.log("Error",inner_err);
                            callback({"success":false,"message":"Something went wrong"}, null)
                            // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                        })
                    }
                }
            }
        });
        
    }
    catch(error){
        console.log("Error",error);
        return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

let courseFilter = (user, msg, callback) => {

    console.log("Data from frontend for Filtering/Searching the courses\n",msg);
    let user_id = user.id

    try {
        let filter_by = msg.filter_by
        let filter_value = msg.filter_value
        let greater_than = msg.greater_than

        // pagination parameters
        let page_number = msg.page
        if(page_number === undefined){
            page_number = 1
        }

        let page_limit = 3
        let pagination_end_index = page_number * page_limit
        let pagination_start_index = pagination_end_index - page_limit
        // 
        
        let filter_object = {}
        if (filter_by == "term"){
            filter_object["term"] = filter_value
        }
        else if (filter_by == "id"){
            if(/^\d+$/.test(filter_value)){
                filter_value = "CMPE" + filter_value
            }
            if (greater_than){
                filter_object["course_id"] = { $gt: filter_value}
            }
            else{
                filter_object["course_id"] = new RegExp(filter_value, "i")
            }
        }
        else{
            filter_object["name"] = new RegExp(filter_value, "i") 
        }
        
        console.log("FILTER OBJECT\n",filter_object)
        let user_enrolled_courses = []
        let output = []

        // var query = Course.find(filter_object).skip(pagination_start_index).limit(page_limit)
        var query = Course.find(filter_object)
        query.exec(async (err, result) => {
            if (err){
                callback({"success":false,"message":"Something went wrong"}, null)
                // return res.status(500).json({"success":false,"message":"Something went wrong"});
            }
            else{
                let enrolled_courses_count = 0
                Enrollment.find({student: user_id,is_active:true}, async function(error,enrollments) {
                    if (error){
                        callback({"success":false,"message":"Something went wrong! Please try again"}, null)
                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                    }
                    else{
                        enrollments.forEach(elem => {
                            console.log(elem)
                            user_enrolled_courses.push(elem.course)
                        })
                        
                        let output = []
                        result.forEach(elem=>{
                            if(!user_enrolled_courses.includes(elem.id)){
                                output.push(elem)
                            }
                            else{
                                enrolled_courses_count += 1
                            }
                        })
                        let page_count = await Course.count(filter_object)
                        page_count -= enrolled_courses_count
                        output = output.slice(pagination_start_index,pagination_end_index)
                        console.log("List of courses returned to the student based on his filter - \n",output)
                        callback(null,{"success":true,"data":output,page_count:page_count})
                        // console.log("count\n",page_count)
                        // return res.status(200).json({"success":true,"data":output,page_count:page_count});
                    }
                });
            }
        });
    }
    catch(error){
        console.log("Error",error);
        callback({"success":false,"message":"Something went wrong! Please try again"}, null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

let coursePost = (user, msg, callback) => {

    console.log("Data for creating course from frontend\n",msg);

    const schema = Joi.object().keys({
        course_id : Joi.string().required(),
        course_name : Joi.string().required(),
        course_dept : Joi.string().required(),
        course_desc : Joi.string().allow(null),
        course_term : Joi.string().required(),
        course_room : Joi.string().required(),
        course_capacity : Joi.number().integer().min(0),
        course_waitlist_capacity : Joi.number().integer().min(0),
    });

    try {
        var data = msg

        Joi.validate(data, schema, (joi_err, value) => {
            if (joi_err) {
                console.log(joi_err)
                // res.status(500).json({"success":false,"message":"Invalid Input! Please try again."});
                // return res;
                callback({"success":false,"message":"Invalid Input! Please try again."}, null)
            }
            else{

                let db_obj = new Course({course_id:msg.course_id,name:msg.course_name,
                    dept:msg.course_dept,description:msg.course_desc,room:msg.course_room,
                    capacity:msg.course_capacity,waitlist_capacity:msg.course_waitlist_capacity,
                    term:msg.course_term,created_by:user.id})

                    db_obj.save().then(result => {
                        console.log("Course Created successfully.\nQuery result - \n",result)
                        callback(null,{"success":true,"message":"Course added successfully",data:result})
                        // return res.status(200).json({"success":true,"message":"Course added successfully",data:result});
                    }).catch(err => {
                        console.log("Error",err);
                        callback({"success":false,"message":"Course already exists"}, null)
                        // return res.status(500).json({"success":false,"message":"Course already exists"});
                    })
            }
        });
    }
    catch(error){
        console.log("Error",error);
        callback({"success":false,"message":"Something went wrong, Please try again"}, null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

function handle_request(data,callback){

    msg = data.msg
    type = data.type
    user = data.user
    
    switch (type) {
		case 'coursePost':
            coursePost(user,msg,callback);
            break;
        case 'courseFilter':
            courseFilter(user,msg,callback);
            break;
        case 'enrollCourse':
            enrollCourse(user,msg,callback);
            break;
        case 'dropCourse' :
            dropCourse(user,msg,callback);
            break;
        case 'waitlistCourse' :
            waitlistCourse(user,msg,callback);
            break;
        case 'courseDetail' :
            courseDetail(user,msg,callback)
            break;
	}

}

exports.handle_request = handle_request;