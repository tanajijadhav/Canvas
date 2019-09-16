import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import moment from 'moment';

class AssignmentComponent extends React.Component {

    render() {
        let points = null
        let is_faculty = localStorage.getItem("user_is_faculty")
        if (!is_faculty){
            points = <div className="col-md-2">
                        <p>/{this.props.assignment.points}</p>
                    </div>
        }
        else{
            points = <div className="col-md-2">
                        <p>Out of {this.props.assignment.points}</p>
                    </div>
        }
        return (
            <div>
                <hr></hr><div className="row">
                    <div className="col-md-1">
                        <img src="https://image.flaticon.com/icons/svg/1306/1306311.svg" alt="#" style={{borderRadius:"50%",width:"42%",height:"75%"}}></img>
                    </div>
                    <div className="col-md-9">
                    <h6 style={{float:"left",marginLeft:"-50px",fontWeight:"400"}} id={this.props.assignment.id} onClick={this.props.assignmentClickHandler}>
                        <a href="javaScript:void(0)" id={this.props.assignment.id} style={{color:"black"}} >{this.props.assignment.title}</a>
                    </h6>
                    </div>
                    {points}
                </div>
            </div>
    )}
}

export default AssignmentComponent;

