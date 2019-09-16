import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router';
import {connect} from "react-redux"

import validateToken from './Auth'
import {getSubmission,submitGrade,write} from "../actions/assignmentFacultyGradeActions"


class AssignmentFacultyGradeAssignment extends React.Component {

    constructor(){
        super();

        this.gradesChangeHandler = this.gradesChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount(){
        this.props.getSubmission(this.props.location.state.submission_id)
    }
    

    gradesChangeHandler = (e) => {
        // console.log(e.target.value)
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.write(data);
    }

    submitHandler = (e) => {
        let data = {}
        data["grades"] = this.props.assignmentGrade.grades
        let course_id = this.props.match.params.course_id
        let submission_id = this.props.location.state.submission_id
        let assignment_id = this.props.match.params.assignment_id

        this.props.submitGrade(data,submission_id,course_id,assignment_id,this.props.history)
    }

    render() {
        if(true)
        {
            let assignmentGrade = this.props.assignmentGrade ||{};
            return (
                <div>
                {validateToken()}
                <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                    <div className="row" style={{marginLeft:"5%"}}>
                        <span>
                            <span className="text-muted" style={{fontSize:"16px"}}>Assignment : </span>  <span style={{fontSize:"18px"}}>{this.props.location.state.title}</span>
                        </span>
                    </div>
                    <div className="row" style={{marginLeft:"5%"}}>
                        <span>
                            <span className="text-muted" style={{fontSize:"14px"}}>Due : </span> <span style={{fontSize:"15px"}}>{moment(this.props.location.state.due_date).format('MMMM Do YYYY, h:mm a')}</span>
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{paddingLeft:"60px"}}>
                            <div className="card-body">
                                <embed src={assignmentGrade.file} download={assignmentGrade.filename} width="1300" height="950" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-muted" style={{marginLeft:"7%"}}>Submitted : </h6>
                            <h6 style={{marginLeft:"29%"}}>
                            {moment(assignmentGrade.created_on).format('MMMM Do YYYY, h:mm a')}
                            </h6>
                            <h6 className="text-muted"  style={{marginLeft:"10%"}}>Assessment : </h6>
                            <h6 style={{marginLeft:"15%"}}>Grade out of {this.props.location.state.out_of_points}</h6>
                            <div className="form-group" style={{marginLeft:"44%"}}>
                                <input type="number" min="0" max={this.props.location.state.out_of_points} className="form-control" style={{width:"35%"}} name="grades" value={assignmentGrade.grades} onChange={this.gradesChangeHandler}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff",marginLeft:"7%"}} onClick = {this.submitHandler}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>  
            )
        }
        else{
            return (
                <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                    No Data
                </div>  
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        assignmentGrade :  (state.assignmentGrade||{}).assignmentGrade,
    }
  }
  AssignmentFacultyGradeAssignment = connect(
    mapStateToProps,
    {getSubmission,submitGrade,write}
  )(AssignmentFacultyGradeAssignment)
  export default withRouter(AssignmentFacultyGradeAssignment);
