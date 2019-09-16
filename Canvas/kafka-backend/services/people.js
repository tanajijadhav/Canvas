let User = require("../models/user")
let Enrollment = require("../models/enrollment")
let Course = require("../models/course")

let peopleGet = (user,msg,course,page,callback) => {
    try {
        let page_count = 0
        let student_list = []
        let page_number = page

        if(page_number === undefined){
            page_number = 1
        }

        let page_limit = 10
        let pagination_end_index = page_number * page_limit
        let pagination_start_index = pagination_end_index - page_limit

        Course.findOne({'id': course}, function(db_error, course_obj) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            if(course_obj === null){
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            Enrollment.find({'course': course,'is_active':true}, function(inner_db_error, enrolled_list) {
                if (inner_db_error){
                    callback({"success":false,"message":"Something went wrong! Please try again"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }
                else{
                    console.log(enrolled_list)
                    enrolled_list.forEach(elem => {
                        student_list.push(elem.student)
                    })
                    console.log(student_list)
                    if(student_list.length <= 0){
                        User.findOne({'id': course_obj.created_by}, function(prof_error, prof_obj) {
                            if (prof_error){
                                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            if(prof_obj === null){
                                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            if(prof_obj.profile_pic){
                                prof_obj.profile_pic = "http://18.191.237.120:3001/" + prof_obj.profile_pic
                            }  
                            else{
                                prof_obj.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                            }
                            console.log("prof_obj",prof_obj)
                            let output = {}
                            output["course"] = course_obj
                            output["student"] = []
                            output["profressor"] = prof_obj
                            // return res.status(200).json({data:output})
                            callback(null,{data:output})
                        });

                    }
                    else{
                        console.log("---pagination_start_index\n",pagination_start_index)
                        var query = User.find({'id': {$in:student_list}}).skip(pagination_start_index).limit(page_limit)
                        query.exec((inner_inner_db_error, students_detail_list) => {
                            if (inner_inner_db_error){
                                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            else{
                                console.log("students_detail_list",students_detail_list)
                                students_detail_list.forEach(elem => {
                                    if(elem.profile_pic){
                                    elem.profile_pic = "http://18.191.237.120:3001/" + elem.profile_pic
                                    }  
                                    else{
                                        elem.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                                    }
                                })

                                User.findOne({'id': course_obj.created_by}, async function(prof_error, prof_obj) {
                                    if (prof_error){
                                        callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                    }
                                    if(prof_obj === null){
                                        callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                    }
                                    if(prof_obj.profile_pic){
                                        prof_obj.profile_pic = "http://18.191.237.120:3001/" + prof_obj.profile_pic
                                    }  
                                    else{
                                        prof_obj.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                                    }
                                    // console.log("prof_obj",prof_obj)
                                    let output = {}
                                    output["course"] = course_obj
                                    page_count = await User.count({'id': {$in:student_list}})
                                    output["student"] = students_detail_list
                                    output["profressor"] = prof_obj
                                    console.log("output\n",output)
                                    // return res.status(200).json({data:output,page_count:page_count})
                                    callback(null,{data:output,page_count:page_count})
                                });
                            }
                        });
                        
                    }
                }
            });
        });
    }
    catch(error){
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

// non paginated
let allpeopleGet = (user,msg,course,callback) => {
    try {
        let student_list = []

        Course.findOne({'id': course}, function(db_error, course_obj) {
            if (db_error){
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            if(course_obj === null){
                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
            }
            Enrollment.find({'course': course,'is_active':true}, function(inner_db_error, enrolled_list) {
                if (inner_db_error){
                    callback({"success":false,"message":"Something went wrong! Please try again"},null)
                    // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                }
                else{
                    console.log(enrolled_list)
                    enrolled_list.forEach(elem => {
                        student_list.push(elem.student)
                    })
                    console.log(student_list)
                    if(student_list.length <= 0){
                        User.findOne({'id': course_obj.created_by}, function(prof_error, prof_obj) {
                            if (prof_error){
                                return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            if(prof_obj === null){
                                return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            if(prof_obj.profile_pic){
                                prof_obj.profile_pic = "http://18.191.237.120:3001/" + prof_obj.profile_pic
                            }  
                            else{
                                prof_obj.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                            }
                            console.log("prof_obj",prof_obj)
                            let output = {}
                            output["course"] = course_obj
                            output["student"] = []
                            output["profressor"] = prof_obj
                            callback(null,{data:output})
                            // return res.status(200).json({data:output})
                        });

                    }
                    else{
                        User.find({'id': {$in:student_list}}, function(inner_inner_db_error, students_detail_list) {
                            if (inner_inner_db_error){
                                callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                            }
                            else{
                                console.log("students_detail_list",students_detail_list)
                                students_detail_list.forEach(elem => {
                                    if(elem.profile_pic){
                                    elem.profile_pic = "http://18.191.237.120:3001/" + elem.profile_pic
                                    }  
                                    else{
                                        elem.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                                    }
                                })

                                User.findOne({'id': course_obj.created_by}, function(prof_error, prof_obj) {
                                    if (prof_error){
                                        callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                    }
                                    if(prof_obj === null){
                                        callback({"success":false,"message":"Something went wrong! Please try again"},null)
                                        // return res.status(500).json({"success":false,"message":"Something went wrong! Please try again"});
                                    }
                                    if(prof_obj.profile_pic){
                                        prof_obj.profile_pic = "http://18.191.237.120:3001/" + prof_obj.profile_pic
                                    }  
                                    else{
                                        prof_obj.profile_pic = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                                    }
                                    console.log("prof_obj",prof_obj)
                                    let output = {}
                                    output["course"] = course_obj
                                    output["student"] = students_detail_list
                                    output["profressor"] = prof_obj
                                    // return res.status(200).json({data:output})
                                    callback(null,{data:output})
                                });
                            }
                        });
                        
                    }
                }
            });
        });
    }
    catch(error){
        callback({"success":false,"message":"Something went wrong! Please try again"},null)
        // return res.status(500).json({"success":false,"message":"Something went wrong, Please try again"});
    }
}

function handle_request(data,callback){

    msg = data.msg
    type = data.type
    user = data.user
    course = data.course
    assignment = data.assignment
    file = data.file
    page = data.page
    
    switch (type) {
		case 'peopleGet':
            peopleGet(user,msg,course,page,callback);
            break;
        case 'allpeopleGet' :
            allpeopleGet(user,msg,course,callback);
            break;
	}

}

exports.handle_request = handle_request;