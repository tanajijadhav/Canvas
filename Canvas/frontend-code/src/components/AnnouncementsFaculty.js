import React from 'react';
import { withRouter } from 'react-router';
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"
import AnnouncementsListing from "./AnnouncementListing"

import {getAnnouncement,write,postAnnouncement} from "../actions/announcementFacultyActions"

class AnnouncementsFaculty extends React.Component {
    constructor(){
        super();

        this.writeHandler = this.writeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount(){
        this.props.getAnnouncement(this.props.match.params.course_id);
    }
    
    writeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.write(data);
        // this.ableButton();
    }

    submitHandler = (e) => {

        e.preventDefault();

        console.log(this.props.announcementFaculty)

        const data = {
            title : this.props.announcementFaculty.title,
            message : this.props.announcementFaculty.announce_message,
            course : this.props.match.params.course_id,
        }
        
        this.props.postAnnouncement(data,document.getElementById("announcement_form"),this.props.match.params.course_id);
    }

    render() {

        let announcementFaculty = this.props.announcementFaculty ||{};

        const ann_list = announcementFaculty.announcement_list.map((announcement,index) =>{
            // console.log(index)
            return <AnnouncementsListing announcement={announcement} created_by={announcementFaculty.created_by_list[index]} />
        }
            
        );
        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="announcements" />
                <div class="content">
                    <div style={{backgroundColor:"mintcream"}}>
                        <h5>Announcements</h5>
                        <div style={{overflowX:"hidden",overflowY:"scroll",height:"350px"}}>
                            {ann_list}
                        </div><hr></hr>
                    </div>
                    

                    <form id="announcement_form" style={{width:"80%",marginLeft:"10%"}}>
                        <h6 style={{marginTop:"5%"}}>Make an Announcement</h6><hr></hr>
                        <div class={announcementFaculty.alertClass} style={{display: announcementFaculty.first ? "none" : "block"}}>
                            <small>
                                {announcementFaculty.message}
                            </small>
                        </div>
                        <div className="form-group">
                            <label for="Title">Title</label>
                            <input type="text" className="form-control" required name="title" onChange = {this.writeHandler} />
                        </div>
                        <div className="form-group">
                            <label for="Message">Message</label>
                            <input type="text" className="form-control" required name="announce_message" onChange = {this.writeHandler} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick = {this.submitHandler} >Submit</button>
                        </div>
                    </form><hr></hr>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        announcementFaculty :  (state.announcementFaculty||{}).announcementFaculty,
    //   error: (state.authReducer||{}).error,
    }
  }
AnnouncementsFaculty = connect(
mapStateToProps,
{getAnnouncement,write,postAnnouncement}
)(AnnouncementsFaculty)
export default withRouter(AnnouncementsFaculty);