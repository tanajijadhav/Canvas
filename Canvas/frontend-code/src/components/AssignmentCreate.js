import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import validateToken from './Auth'
import { withRouter } from 'react-router';
import {connect} from "react-redux"
import Datetime from 'react-datetime';

import CourseSideBar from "../components/CourseSideBar"

import {postAssignment,writeAssignment} from "../actions/assignmentCreateActions"

class AssignmentCreate extends React.Component {
    constructor(){
        super();

        this.writeChangeHandler = this.writeChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    writeChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeAssignment(data);
    }

    submitHandler = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            title : this.props.assignmentCreate.title,
            body : this.props.assignmentCreate.body,
            due_date : this.props.assignmentCreate.due_date,
            points : this.props.assignmentCreate.points,
            course : this.props.match.params.course_id,
        }
        this.props.postAssignment(this.props.match.params.course_id,data,document.getElementById("assignment_form"));
    }

    render() {
        
        let assignment_url = "/course/"+this.props.match.params.course_id+"/assignments"
        let assignmentCreate = this.props.assignmentCreate ||{};

        return (
            <div>
                {validateToken()}
                <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                    <CourseSideBar active="assignments" />
                    <div class="content">
                            <div className="form-group" style={{float:"right",marginTop:"-45px",marginTop:"5px"}}>
                                <a href={assignment_url}><button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}}>Back</button></a>
                            </div>
                        <form id="assignment_form" style={{width:"80%",marginLeft:"10%"}}>
                            <h3 style={{marginTop:"5%"}}>Assignment</h3><hr></hr>
                            <div class={assignmentCreate.alertClass} style={{display: assignmentCreate.first ? "none" : "block"}}>
                                <small>
                                    {assignmentCreate.message}
                                </small>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" required  placeholder="Title" name="title"  onChange = {this.writeChangeHandler} />
                            </div>
                            <div className="form-group">
                                <textarea class="form-control" rows="3" placeholder="Body" name="body" onChange = {this.writeChangeHandler} required></textarea>
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" required  placeholder="Points" name="points" onChange = {this.writeChangeHandler} />
                            </div>
                            <div className="form-group">
                                <input type="datetime-local" className="form-control" required  placeholder="Due Date" name="due_date" onChange = {this.writeChangeHandler} ></input>
                            </div>
                            
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick = {this.submitHandler} >Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
      assignmentCreate :  (state.assignmentCreate||{}).assignmentCreate,
    }
  }
  AssignmentCreate = connect(
    mapStateToProps,
    {postAssignment,writeAssignment}
  )(AssignmentCreate)
  export default withRouter(AssignmentCreate);