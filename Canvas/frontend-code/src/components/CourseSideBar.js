import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'


class CourseSideBar extends React.Component {
    constructor(){
        super();

        this.state = {
            course_id : null,
            is_faculty : localStorage.getItem("user_is_faculty")
        }

    }

    componentDidMount(){
        this.setState({
            course_id : this.props.match.params.course_id,
        })
    }

    render() {

        // console.log("State---------------",this.state.course_id)
        let home_class = null
        let assignments_class = null
        let grades_class = null
        let announcements_class = null
        let people_class = null
        let file_class =  null
        let quiz_class = null
        let permission_class = null
        let home_url = "/course/"+this.state.course_id
        let announcement_url = "/course/"+this.state.course_id+"/announcements"
        let people_url = "/course/"+this.state.course_id+"/people"
        let assignment_url = "/course/"+this.state.course_id+"/assignments"
        let files_url = "/course/"+this.state.course_id+"/files"
        let quiz_url = "/course/"+this.state.course_id+"/quiz"        
        let grade_url = "/course/"+this.state.course_id+"/grades"
        let permission_url = "/course/"+this.state.course_id+"/permision_code"        
        // console.log("-------------------",this.props.active)

        if(this.props.active == "home"){
            home_class = "active"
        }
        else if(this.props.active == "assignments"){
            assignments_class = "active"
        }
        else if(this.props.active == "grades"){
            grades_class = "active"
        }
        else if(this.props.active == "announcements"){
            announcements_class = "active"
        }
        else if(this.props.active == "files")
        {
            file_class = "active"
        }
        else if(this.props.active == "quiz")
        {
            quiz_class = "active"
        }
        else if (this.props.active == "permission"){
            permission_class = "active"
        }
        else{
            people_class = "active"
        }

        let grade_div = null
        let permission_div = null
        console.log(this.state.is_faculty)
        if(this.state.is_faculty == 'false'){
            grade_div = (
                <a className={grades_class} href={grade_url}>Grades</a>
            )
        }
        else{
            permission_div = (
                <a className={permission_class} href={permission_url}>Permission Code</a>
            )
        }

        return (
            <div>
                <div className="sidebar" style={{borderRight:"1px"}}>
                    <a className={home_class} href={home_url}>Home</a>
                    <a className={assignments_class} href={assignment_url}>Assignments</a>
                    <a className={quiz_class} href={quiz_url}>Quiz</a>
                    {grade_div}
                    <a className={file_class} href={files_url}>Files</a>
                    <a className={announcements_class} href={announcement_url}>Announcements</a>
                    <a className={people_class} href={people_url}>People</a>
                    {permission_div}
                </div> 
            </div>
    )}
}

export default withRouter(CourseSideBar);