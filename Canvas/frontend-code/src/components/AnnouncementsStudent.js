import React from 'react';
import { withRouter } from 'react-router';
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"
import AnnouncementsListing from "./AnnouncementListing"

import getAnnouncement from "../actions/announcementStudentActions"

class AnnouncementsStudent extends React.Component {

    componentDidMount(){
        this.props.getAnnouncement(this.props.match.params.course_id);
    }

    render() {

        let announcementStudent = this.props.announcementStudent ||{};

        console.log("announcementStudent",announcementStudent)

        let ann_list = null

        if(Object.keys("announcementStudent").length !== 0){
            ann_list = announcementStudent.announcement_list.map((announcement,index) =>{
                // console.log(index)
                return <AnnouncementsListing announcement={announcement} created_by={announcementStudent.created_by_list[index]} />
            });
        }
        
        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="announcements" />
                <div class="content" >
                    <h5>Announcements</h5>
                    <div style={{overflowX:"hidden",overflowY:"scroll",height:"80%"}}>
                        {ann_list}
                    </div>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        announcementStudent :  (state.announcementStudent||{}).announcementStudent,
    //   error: (state.authReducer||{}).error,
    }
  }
  AnnouncementsStudent = connect(
    mapStateToProps,
    {getAnnouncement}
  )(AnnouncementsStudent)
  export default withRouter(AnnouncementsStudent);
