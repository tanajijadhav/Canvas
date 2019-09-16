import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import moment from 'moment';

class AnnouncementsListing extends React.Component {

    render() {
        // let active_tab = {backgroundColor:"#0055a2",fontWeight:"bold",color:"#fff"};
        console.log("Inside in announcements",this.props)
        return (
            <div>
                <hr></hr><div className="row">
                    <div className="col-md-2">
                        <img src={this.props.created_by.profile_pic} alt="#" style={{borderRadius:"50%",width:"33%",height:"90%"}}></img>
                    </div>
                    <div className="col-md-7">
                        <p style={{marginBottom:"-20px",float:"left",marginLeft:"-50px",fontWeight:"500"}}>{this.props.announcement.title}</p><br></br>
                        <p style={{float:"left",marginLeft:"-50px"}}>{this.props.announcement.message}</p>
                    </div>
                    <div className="col-md-3 text-muted">
                        <p>{moment(this.props.announcement.created_on).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                </div>
            </div>
    )}
}

export default AnnouncementsListing;

