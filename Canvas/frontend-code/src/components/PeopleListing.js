import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import moment from 'moment';

class PeopleListing extends React.Component {

    constructor(){
        super();

        this.state = {
            is_faculty : localStorage.getItem("user_is_faculty")
        }
    }


    render() {

        // console.log(this.props);
        
        let remove_student_button = null;
        if (this.state.is_faculty == "true" && this.props.role != "Profressor"){
            remove_student_button = (
                <a href="javascript:void(0)" id={this.props.student_id}><img src="https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627249-delete3-512.png" id={this.props.student_id} onClick={this.props.removeStudentHandler} alt="#" style={{width:"35%"}}>
                </img></a>
            )
        }

        return (
            <div>
                <hr></hr><div className="row">
                    <div className="col-md-2">
                        <img src={this.props.profile_pic} alt="#" style={{borderRadius:"50%",width:"33%",height:"90%"}}></img>
                    </div>
                    <div className="col-md-4">
                        <p style={{float:"left"}}>{this.props.name}</p>
                    </div>
                    <div className="col-md-3">
                        <p>{this.props.course}</p>
                    </div>
                    <div className="col-md-2">
                        <p>{this.props.role}</p>
                    </div>
                    <div className="col-md-1">
                        {remove_student_button}
                    </div>
                </div>
            </div>
    )}
}

export default PeopleListing;

