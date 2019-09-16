import React from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"

import {getData,uploadFile,write} from "../actions/assignmentStudentDetailActions"

class StudentAssignmentDetail extends React.Component {
    constructor(){
        super();

        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.showUploadEnabled = this.showUploadEnabled.bind(this);
        this.uploadFileHandler = this.uploadFileHandler.bind(this);
    }

    componentDidMount(){
        this.props.getData(this.props.match.params.course_id,this.props.match.params.assignment_id,document.getElementById("label_button"));
    }

    showUploadEnabled = (e) => {
        document.getElementById("file_upload_div").style.display = "block";
    }

    fileChangeHandler = (e) => {
        console.log("File change",e.target.files[0])
        let data = {
            [e.target.name] : e.target.files[0]
        }
        this.props.write(data);
    }

    uploadFileHandler = (e) => {
        var data = new FormData()
        data.append('file',this.props.assignmentStudentDetail.file);
        console.log("data ",data)

        this.props.uploadFile(data,this.props.match.params.course_id,this.props.match.params.assignment_id,document.getElementById("file_upload_div"),document.getElementById("label_button"))
        
    }


    render() {
        let assignmentStudentDetail = this.props.assignmentStudentDetail ||{};

        const submission_list = assignmentStudentDetail.submissions.map((elem) =>{
            // console.log(index)
            return (
                <div>
                    <hr></hr>
                    <a href={elem.file} download target="_blank">{elem.filename}</a><br></br>
                    on {moment(elem.created_on).format('h:mm a, MMMM Do')}
                </div>
            )
        })

        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="assignments" />
                <div className="content" >  
                    <div className="row">
                        <div className="col-md-8">
                            <span>
                                <h3>{assignmentStudentDetail.title}</h3>
                                <div className="form-group" style={{float:"right",marginTop:"-45px"}}>
                                    <button id="label_button" type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick={this.showUploadEnabled}>Submit Assignment</button>
                                </div>
                            </span><hr></hr>
                            <div className="row">
                                <div className="col-md-4">
                                    <span style={{fontWeight:"500",marginRight:"10px",marginLeft:"10px"}}>Due</span><span>{moment(assignmentStudentDetail.due_date).format('MMMM Do YYYY, h:mm a')}</span>
                                </div>
                                <div className="col-md-4">
                                    <span style={{fontWeight:"500",marginRight:"10px"}}>Points</span><span>{assignmentStudentDetail.points}</span>
                                </div>
                            </div><hr></hr>
                            <div style={{float:"left",marginLeft:"10px"}}>
                                {assignmentStudentDetail.body}
                            </div>
                            <div id="file_upload_div" style={{paddingTop:"25%",marginLeft:"inherit",display:"none"}}>
                                <div style={{border:"1px solid gray",width:"100%",padding:"44px"}}>
                                <input type="file" id="file" name="file" accept="application/pdf,application/msword" onChange={this.fileChangeHandler}/>
                                    <button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick={this.uploadFileHandler}>Upload File</button>
                                </div>
                                <div className="alert alert-danger" style={{display: assignmentStudentDetail.file_error ? "block" : "none"}}>
                                    <small>
                                        Please input valid File with valid Format
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" style={{display: assignmentStudentDetail.is_submitted ? "block" : "none",marginLeft:"6%",maxWidth:"min-content"}}>
                            <h5>Submission</h5>
                            <h7 style={{marginLeft:"-20px"}}><img src="http://gardenis.eu/wp-content/uploads/2019/01/zymeklis-zalias.jpg" alt="#" style={{width:"20%"}}></img>Submitted</h7>
                            {submission_list}
                        </div>
                    </div>
                    
                </div>
            </div> 
    )}
}


const mapStateToProps = (state) => {
    return {
        assignmentStudentDetail :  (state.assignmentStudentDetail||{}).assignmentStudentDetail,
    //   error: (state.authReducer||{}).error,
    }
  }
  StudentAssignmentDetail = connect(
    mapStateToProps,
    {getData,uploadFile,write}
  )(StudentAssignmentDetail)
  export default withRouter(StudentAssignmentDetail);