const uuidv4 = require('uuid/v4')
const multer = require('multer');
let passport = require('passport');
const storage  = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        console.log("File obj",file)
        let arr = file.originalname.split(".")
        let temp_name = arr[0] + uuidv4() + "." +arr[1]
        cb(null,temp_name)
    }
})

const s = {
    session : false
}

const imageFiter = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(new Error("File type not supported"),true);
    }
    else{
        cb(null,false);
    }
}

const upload = multer({
    storage:storage,
//    fileFilter:imageFiter,
})



const loginController = require('../controller/loginController');
const profileController = require('../controller/profileController');
const courseController = require("../controller/courseController")
const facultyController = require("../controller/facultyController")
const studentController = require("../controller/studentController")
const UserDetailController = require("../controller/userDetailController")
const announcementController = require("../controller/announcementController")
const peopleController = require("../controller/peopleController")
const assignmentController = require("../controller/assignmentController")
const submissionController = require("../controller/submissionController")
const fileController = require("../controller/filecontroller")
const quizController = require("../controller/quizController")
const gradeController = require("../controller/gradeController")
const permissionCodeController = require("../controller/permissionCodeController")
const messageController = require("../controller/messageController")

module.exports = (router) => {
    router.get('/login', loginController.loginGet)
    router.post('/login', loginController.loginPost)
    router.get('/logout', loginController.logout)
    router.post('/register', loginController.registerPost)
    router.get('/profile', passport.authenticate('jwt',s),profileController.profileGet)
    router.post('/profile', passport.authenticate('jwt',s),upload.single("profile_pic"),profileController.profilePost)
    router.get('/faculty', passport.authenticate('jwt',s),facultyController.facultyLandingGet)
    router.post('/course', passport.authenticate('jwt',s),courseController.coursePost)
    router.get('/user', passport.authenticate('jwt',s),UserDetailController.UserDetail)
    router.get('/student', passport.authenticate('jwt',s),studentController.studentLandingGet)
    router.post('/course_filter', passport.authenticate('jwt',s),courseController.courseFilter)
    router.post('/enroll_course', passport.authenticate('jwt',s),courseController.enrollCourse)
    router.post('/drop_course', passport.authenticate('jwt',s),courseController.dropCourse)
    router.post('/waitlist_course', passport.authenticate('jwt',s),courseController.waitlistCourse)
    router.post('/course_detail', passport.authenticate('jwt',s),courseController.courseDetail)
    router.post('/announcement', passport.authenticate('jwt',s),announcementController.announcementPost)
    router.get('/:course/announcement', passport.authenticate('jwt',s),announcementController.announcementGet)
    router.get('/:course/people/:page', passport.authenticate('jwt',s),peopleController.peopleGet)
    router.post('/:course/assignment/create', passport.authenticate('jwt',s),assignmentController.assignmentCreate)
    router.get('/:course/assignment', passport.authenticate('jwt',s),assignmentController.assignmentList)
    router.get('/:course/assignment/:assignment', passport.authenticate('jwt',s),assignmentController.assignmentRetrieve)
    router.post('/:course/assignment/:assignment/submit', passport.authenticate('jwt',s),upload.single("file"),assignmentController.assignmentSubmit)
    router.get('/:course/assignment/:assignment/submissions', passport.authenticate('jwt',s),upload.single("file"),assignmentController.assignmentSubmissionFiles)
    router.get('/:course/assignment/:assignment/all_submissions', passport.authenticate('jwt',s),assignmentController.assignmentSubmissionList)    
    router.get('/submission/:submission_id', passport.authenticate('jwt',s),submissionController.submissionRetrieve)    
    router.post('/submission/:submission_id', passport.authenticate('jwt',s),submissionController.gradeSubmission)    
    router.get('/:course/files', passport.authenticate('jwt',s),upload.single("file"),fileController.fileGet)
    router.post('/:course/files', passport.authenticate('jwt',s),upload.single("file"),fileController.filePost)
    router.post('/:course/quiz/create', passport.authenticate('jwt',s),quizController.quizCreate)
    router.get('/:course/quiz/list', passport.authenticate('jwt',s),quizController.quizList)    
    router.get('/:course/quiz/student_list', passport.authenticate('jwt',s),quizController.quizStudentList)    
    router.get('/:course/quiz/:quiz/detail', passport.authenticate('jwt',s),quizController.quizDetail)    
    router.post('/:course/quiz/:quiz/submit', passport.authenticate('jwt',s),quizController.quizSubmit)        
    router.get('/:course/quiz_grade', passport.authenticate('jwt',s),gradeController.quizGradeGet)        
    router.get('/:course/assignment_grade', passport.authenticate('jwt',s),gradeController.assignmentGradeGet)        
    router.post('/:course/permission_code', passport.authenticate('jwt',s),permissionCodeController.permissionCodeGenerate)        
    router.get('/:course/permission_code', passport.authenticate('jwt',s),permissionCodeController.permissionCodeList)        
    router.post('/message_post', passport.authenticate('jwt',s),messageController.messagePost)    
    router.post('/message', passport.authenticate('jwt',s),messageController.messageGet)   
    router.post('/message_chain', passport.authenticate('jwt',s),messageController.messageChainPost)  
    router.get('/:course/all_people', passport.authenticate('jwt',s),peopleController.allpeopleGet)
    return router;
}