import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import validateToken from './Auth'
import { withRouter } from 'react-router';
import moment from 'moment';
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"

import {getFiles,write,uploadFileHandler} from "../actions/courseFileActions"

class CourseFiles extends React.Component {
    constructor(){
        super();

        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.uploadFileHandler = this.uploadFileHandler.bind(this);
    }

    componentDidMount(){
        this.props.getFiles(this.props.match.params.course_id)
    }

    fileChangeHandler = (e) => {
        // console.log(e.target.files[0])
        // this.setState({
        //     file : e.target.files[0]
        // })
        // this.ableButton();
        this.props.write({
            file : e.target.files[0]
        })
    }

    uploadFileHandler = (e) => {
        var headers = new Headers();
        e.preventDefault();
        var data = new FormData()
        data.append('file',this.props.courseFile.file);

        //make a post request with tcoursehe user data
        this.props.uploadFileHandler(this.props.match.params.course_id,data,document.getElementById("upload_form"))
    }

    render() {
        let courseFile = this.props.courseFile || {}
        
        let file_comp = courseFile.file_list.map((elem) =>{
            // console.log(index)
            let file_url = "http://18.191.237.120:3001/"+elem.file
            return(
                <div>
                    <hr></hr><div className="row">
                        <div className="col-md-9">
                            <h6 style={{float:"left"}}><a href={file_url} target="_blank">{elem.filename}</a></h6>
                        </div>
                        <div className="col-md-3">
                            <p>{moment(elem.uploaded_on).format('h:mm a, MMMM Do')}</p>
                        </div>
                    </div>
                </div>
            )
        }            
        );


        let upload_div = null;
        if(courseFile.is_faculty == 'true'){
            upload_div = (
                <div><hr></hr>
                    <div style={{border:"1px solid gray",width:"57%",padding:"28px",marginLeft:"20%"}}>
                    <input type="file" id="file_field" name="avatar" accept="application/pdf" onChange={this.fileChangeHandler}/>
                        <button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick={this.uploadFileHandler}>Upload File</button>
                    </div>
                    <div className="alert alert-danger" style={{display: courseFile.file_error ? "block" : "none",width:"57%",marginLeft:"20%"}}>
                        <small>
                            Please input valid File with valid Format
                        </small>
                    </div>
                </div>
            )
        }


        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="files" />
                <div class="content" style={{width:"73%",marginLeft:"19%"}}>
                    <h4>
                        Files
                    </h4>
                    <form id="upload_form">
                        {upload_div}
                    </form>
                    {file_comp}
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        courseFile :  (state.courseFile||{}).courseFile,
    //   error: (state.authReducer||{}).error,
    }
  }

  CourseFiles = connect(
    mapStateToProps,
    {getFiles,write,uploadFileHandler}
  )(CourseFiles)
  export default withRouter(CourseFiles);