import React from 'react';
import { withRouter } from 'react-router';
import {connect} from "react-redux"


import validateToken from './Auth'

import CourseSideBar from "../components/CourseSideBar"
import AssignmentComponent from "../components/AssignmentComponent"

import getAssignments from "../actions/assignmentActions"

class AssignmentList extends React.Component {
    constructor(){
        super();

        this.assignmentClickHandler = this.assignmentClickHandler.bind(this);
    }

    componentDidMount(){
        this.props.getAssignments(this.props.match.params.course_id)
    }

    assignmentClickHandler = (e) => {
        console.log("Inside assignmentClick",e.target.id)
        this.props.history.push("/course/"+this.props.match.params.course_id+"/assignments/"+e.target.id+"/submissions");
    }

    render() {

        let assignment = this.props.assignment ||{};

        let is_faculty = localStorage.getItem("user_is_faculty");

        const assignments_list = assignment.assignment_list.map((elem) =>{
            return <AssignmentComponent assignment={elem} assignmentClickHandler={this.assignmentClickHandler}/>
        });

        let create_button = null;
        if(is_faculty == "true"){
            let create_url = "/course/"+this.props.match.params.course_id+"/assignments/create"
            create_button = <div className="form-group" style={{float:"right",marginTop:"-45px"}}>
                <a href={create_url}><button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}}>Create New Assignment</button></a>
            </div>
        }
        
        return (
            <div>
                {validateToken()}
                <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                    <CourseSideBar active="assignments" />
                    <div class="content" >  
                        <span>
                            <h3>Assignments</h3>
                            {create_button}
                        </span>
                        {assignments_list}
                    </div>
                </div>
            </div>
                
    )}
}

const mapStateToProps = (state) => {
    return {
      assignment :  (state.assignment||{}).assignment,
    //   error: (state.authReducer||{}).error,
    }
  }
  AssignmentList = connect(
    mapStateToProps,
    {getAssignments}
  )(AssignmentList)
  export default withRouter(AssignmentList);
