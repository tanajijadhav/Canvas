import React from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import { withRouter } from "react-router";

import CourseCard from "./FacultyCourseCard";

import validateToken from './Auth'
import {getCourse,postCourse,writeCourse} from "../actions/facultyLandingActions"

class Faculty extends React.Component {
    constructor(){
        super();

        this.writeHandler = this.writeHandler.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    componentDidMount(){
        this.props.getCourse();
    }

    writeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeCourse(data);
    }

    courseClickHandler = (e) => {
        let course_id = e.target.id;
        this.props.history.push("/course/"+course_id);
    }
    

    createCourse = (e) => {
        e.preventDefault();
        const data = {
            course_id : this.props.facultyLanding.course_id,
            course_name : this.props.facultyLanding.course_name,
            course_dept : this.props.facultyLanding.course_dept,
            course_desc : this.props.facultyLanding.course_desc,
            course_term : this.props.facultyLanding.course_term,
            course_room : this.props.facultyLanding.course_room,
            course_capacity : this.props.facultyLanding.course_capacity,
            course_waitlist_capacity : this.props.facultyLanding.course_waitlist_capacity,
        }
        
        this.props.postCourse(data);
        document.getElementById("add-course-form").reset();
    }

    render() {
        validateToken();

        let facultyLandingState = this.props.facultyLanding ||{};

        let coursesCards = null;
        if (Object.keys(facultyLandingState).length !== 0){
            coursesCards = facultyLandingState.courses_list.map((course) =>
                <CourseCard key={course.id} course={course}  courseClickHandler={this.courseClickHandler} />
            )
        }
        
        

        // console.log("coursesCards",coursesCards);

        return (

            <div>
                <div className="card profile-div-center shadow p-3 mb-5 bg-white rounded" style={{minHeight:"100%"}}>
                    <h1>Dashboard</h1><hr></hr>
                    <div className="card-body">
                        <div>
                            <div className="row" style={{marginRight:"0px",marginLeft:"0px"}}>
                            {facultyLandingState.is_courses ? 
                                coursesCards
                             : 
                                <p style={{marginLeft:"44%",fontWeight:"500"}}>No Courses Created</p>
                            }
                            </div>
                        </div><hr></hr>
                        <div>
                            <h4 style={{paddingTop:"10px",paddingBottom:"3%"}}>Add Course</h4>
                            <div class={facultyLandingState.alertClass} style={{display: facultyLandingState.first ? "none" : "block",width:"90%",marginLeft:"05%"}}>
                                <small>
                                    {facultyLandingState.message}
                                </small>
                            </div>
                            <form id="add-course-form">
                                <div className="row">
                                    <div className="form-group" style={{width:"24%",marginRight:"5%",marginLeft:"10%",marginBottom:"3%"}}>
                                        <input type="text" className="form-control" placeholder="Name" name="course_name" onChange = {this.writeHandler} required/>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"4%"}}>
                                        <input type="text" className="form-control" placeholder="ID" name="course_id" onChange = {this.writeHandler} required/>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"4%"}}>
                                        <input type="text" className="form-control" placeholder="Department" name="course_dept" onChange = {this.writeHandler} required/>
                                    </div>
                                    
                                    <div className="form-group" style={{width:"15%",marginRight:"4%"}}>
                                        <select class="custom-select" placeholder="Term" name="course_term" onChange = {this.writeHandler} required>
                                            <option value="" disabled selected>Term</option>
                                            <option value="Spring">Spring</option>
                                            <option value="Fall">Fall</option>
                                        </select>
                                    </div>
                                    <div className="form-group" style={{width:"24%",marginRight:"5%",marginLeft:"10%"}}>
                                        <input type="text" className="form-control" placeholder="Description" name="course_desc" onChange = {this.writeHandler}/>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"4%"}}>
                                        <input type="text" className="form-control" placeholder="Room" name="course_room" onChange = {this.writeHandler}/>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"4%"}}>
                                        <input type="text" className="form-control" placeholder="Course Capacity" name="course_capacity" onChange = {this.writeHandler} required/>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"1%"}}>
                                        <input type="text" className="form-control" placeholder="Waitlist Capacity" name="course_waitlist_capacity" onChange = {this.writeHandler} value={facultyLandingState.name} required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button style={{backgroundColor:"#007dc1",color:"#fff",width:"16%",marginLeft:"41%",marginTop:"2%"}} className="form-control" onClick = {this.createCourse}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    console.log("----mapStateToProps----",state)
    return {
        facultyLanding :  (state.facultyLanding||{}).facultyLanding,
    //   error: (state.authReducer||{}).error,
    }
  }
  Faculty = connect(
    mapStateToProps,
    {getCourse, postCourse, writeCourse}
  )(Faculty)
  export default withRouter(Faculty);
