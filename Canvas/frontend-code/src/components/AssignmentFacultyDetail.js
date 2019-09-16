import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"
import AssignmentFacultyDetailCard from "../components/AssignmentFacultyDetailCard"
import fetchData from "../actions/assignmentFacultyDetailActions"

class StudentAssignmentDetail extends React.Component {
    constructor(){
        super();

        this.fileView = this.fileView.bind(this);
    }

    componentDidMount(){
        this.props.fetchData(this.props.match.params.course_id,this.props.match.params.assignment_id)
    }

    fileView = (e) => {
        let submission_id = e.target.id
        this.props.history.push({
            pathname: "/course/"+this.props.match.params.course_id+"/assignments/"+this.props.match.params.assignment_id+"/submissions/view",
            // search: '?query=abc',
            state: { 
                submission_id : submission_id,
                title : this.props.assignmentFacultyDetail.title,
                out_of_points : this.props.assignmentFacultyDetail.points,
                due_date : this.props.assignmentFacultyDetail.due_date
            }
        })  
    }


    render() {
        let student_sub_list = this.props.assignmentFacultyDetail.nested_data.map((elem) =>{
            return (<AssignmentFacultyDetailCard obj={elem} points={this.props.assignmentFacultyDetail.points} fileView={this.fileView} />)
        })

        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="assignments" />
                <div className="content" >  
                <h3>{this.props.assignmentFacultyDetail.title}</h3><hr></hr>
                {student_sub_list}
                </div>
            </div>  
    )}
}

const mapStateToProps = (state) => {
    return {
        assignmentFacultyDetail :  (state.assignmentFacultyDetail||{}).assignmentFacultyDetail,
    //   error: (state.authReducer||{}).error,
    }
  }
  StudentAssignmentDetail = connect(
    mapStateToProps,
    {fetchData}
  )(StudentAssignmentDetail)
  export default withRouter(StudentAssignmentDetail);
