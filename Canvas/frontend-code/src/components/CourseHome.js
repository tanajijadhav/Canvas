import React from 'react';
import axios from 'axios';
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"

import getDetail from "../actions/courseHomeActions"

class CourseHome extends React.Component {

    componentDidMount(){
        this.props.getDetail(this.props.match.params.course_id)
    }

    render() {  
        let courseHome = this.props.courseHome || {}

        let is_faculty = localStorage.getItem("user_is_faculty")

        console.log("Faculty",is_faculty)

        // if(is_faculty == "true"){
        //     is_faculty = true
        // }
        // else{
        //     is_faculty = false
        // }

        return (
            <div className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="home" />
                <div class="content">
                    {!courseHome.success ? 
                        <div class={courseHome.alertClass} style={{display: courseHome.first ? "none" : "block"}}>
                            <small>
                                {courseHome.message}
                            </small>
                        </div>
                     : 
                     <div style={{fontSize:"larger"}}>
                        <h2>{courseHome.name}</h2><hr></hr>
                        <p>Course ID : {courseHome.course_id}</p>
                        <p>Course Description : {courseHome.description}</p>
                        <p>Term : {courseHome.term}</p>
                        <p>Department : {courseHome.dept}</p>
                        <p>Room Number : {courseHome.room}</p>
                        {is_faculty &&
                            <div>
                            <p>Class Capacity : {courseHome.capacity}</p>
                            <p>Current Capacity : {courseHome.current_capacity}</p>
                            <p>Waitlist Capacity : {courseHome.waitlist_capacity}</p>
                            <p>Current Waitlist : {courseHome.waitlist_capacity}</p>
                            </div>
                        }
                    </div>   

                    }
                </div>
            </div>
        )}
    }

const mapStateToProps = (state) => {
    return {
        courseHome :  (state.courseHome||{}).courseHome,
    }
  }
  
  CourseHome = connect(
    mapStateToProps,
    {getDetail}
  )(CourseHome)
  export default withRouter(CourseHome);