var connection =  new require('./kafka/Connection');
let db_connection = require('./database.js');

var User = require("./services/login")
var Course = require("./services/course")
var Announcement = require("./services/announcement")
var Assignment = require("./services/assignment")
var Faculty = require("./services/faculty")
var Files = require("./services/files")
var Grade = require("./services/grade")
var Message = require("./services/message")
var People = require("./services/people")
var PermissionCode = require("./services/permissionCode")
var Profile = require("./services/profile")
var Quiz = require("./services/quiz")
var Student = require("./services/student")
var Submission = require("./services/submission")
var UserDetail = require("./services/userDetail")


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        var data = JSON.parse(message.value) 

        let course = null
        let assignment = null
        let file = null
        let page = null
        let quiz = null
        let submission = null
        if('course' in data.data){
            course = data.data.course
        }
        if ('assignment' in data.data){
            assignment = data.data.assignment
        }
        if ('file' in data.data){
            file = data.data.file
        }
        if ('page' in data.data){
            page = data.data.page
        }
        if ('quiz' in data.data){
            quiz = data.data.quiz
        }if ('submission' in data.data){
            submission = data.data.submission
        }

        var request_data = {
            msg : data.data.payload, 
            type : data.data.type, 
            user : data.data.user,
            course : course,
            assignment : assignment,
            file : file,
            page : page,
            quiz : quiz,
            submission : submission,
        }
        fname.handle_request(request_data, function(err,res){
            console.log('after handle',err,res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res,
                        error : err,
                        quiz  }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}


handleTopicRequest("auth",User)

handleTopicRequest("course",Course)
handleTopicRequest("course",Announcement)
handleTopicRequest("course",Assignment)
handleTopicRequest("course",Files)
handleTopicRequest("course",Grade)
handleTopicRequest("course",PermissionCode)
handleTopicRequest("course",Quiz)
handleTopicRequest("course",Submission)

handleTopicRequest("message",Message)

handleTopicRequest("user",People)
handleTopicRequest("user",Profile)
handleTopicRequest("user",Student)
handleTopicRequest("user",Faculty)
handleTopicRequest("user",UserDetail)
