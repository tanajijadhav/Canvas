var chai = require("chai")
chaiHttp = require("chai-http")
var should = chai.should()
var app=require("../index")
chai.use(chaiHttp);

let name = "New User"
let email = "newuser@sjsu.com"
let password = "tj"
let is_faculty = true
let course_id = "sjsu cmpe"
let course_name = "sjsu course"
let course_dept = "SE"
let course_desc = "descbring the course"
let course_term = "Spring"
let course_room = "101"

let jwt_token = null;
let course = null

// test case for register
describe("/Registering New User",()=> {
 it("User should get registered",done=>{
     let data={
        "name" : name,
        "email" : email,
        "password" : password,
        "is_faculty" : is_faculty,
     };

     chai
     .request(app)
     .post("/register")
     .send(data)
     .end((err,res) => {
        res.should.have.status(200);
        done();
     });
 })   
})

// test case for login
describe("/User logging in",()=> {
    it("User should get logged in successfully.",done=>{
        let data={
           "email" : email,
           "password" : password,
           "is_faculty" : is_faculty,
        };
   
        chai
        .request(app)
        .post("/login")
        .send(data)
        .end((err,res) => {
           res.should.have.status(200);
           jwt_token = res.body.token
           done();
        });
    })   
})

// test case for getting profile data
describe("/User getting his/her profile data",()=> {
    it("User should get profile data successfully.",done=>{

        chai
        .request(app)
        .get("/profile")
        .set("token",jwt_token)
        .end((err,res) => {
           res.should.have.status(200);
           done();
        });
    })   
})

// test case for creating courses
describe("/Faculty user creating new Course",()=> {
    it("Faculty should be able to create new course successfully",done=>{
        let data={
            course_id : course_id,
            course_name : course_name,
            course_dept : course_dept,
            course_desc : course_desc,
            course_term : course_term,
            course_room : course_room,
            course_capacity : 100,
            course_waitlist_capacity : 100
        };
   
        chai
        .request(app)
        .post("/course")
        .set("token",jwt_token)
        .send(data)
        .end((err,res) => {
           res.should.have.status(200);
           course = res.body.data.insertId
           done();
        });
    })   
})

// test case for enrolling courses
describe("/Student user enrolling into Course",()=> {
    it("Student should be able to enroll into course successfully",done=>{
        let data={
            course_primary_id : course
        };
   
        chai
        .request(app)
        .post("/enroll_course")
        .set("token",jwt_token)
        .send(data)
        .end((err,res) => {
           res.should.have.status(200);
           done();
        });
    })   
})
