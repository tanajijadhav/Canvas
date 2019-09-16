import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class CourseCard extends React.Component {
    constructor(){
        super();
    }

    render() {
        
        return (
            <div class="card col-md-3 shadow p-3 mb-5 bg-white rounded" style={{marginRight:"5%",marginLeft:"3%"}}>
                <div class="card-body">
                    <h5 className="card-text" id={this.props.course.id} onClick={this.props.courseClickHandler}>
                        <a href="javaScript:void(0)" id={this.props.course.id}>{this.props.course.course_id} : {this.props.course.name}</a>
                    </h5><hr></hr>
                    <p class="card-text" style={{fontWeight:"400"}}>Department : {this.props.course.dept}</p>
                    <p class="card-text" style={{fontWeight:"400"}}>Term : {this.props.course.term}</p>
                    <p class="card-text" style={{fontWeight:"400"}}>Description : {this.props.course.description}</p>
                    <p class="card-text" style={{fontWeight:"400"}}>Room Number : {this.props.course.room}</p>
                    <p class="card-text" style={{fontWeight:"400"}}>Course Capacity : {this.props.course.capacity}</p>
                    <p class="card-text" style={{fontWeight:"400"}}>Course Current Capacity : {this.props.course.current_capacity}</p>
                    <p class="card-text" style={{fontWeight:"400"}}>WaitList Capacity : {this.props.course.waitlist_capacity}</p>
                    <p class="card-text" style={{fontWeight:"400"}}>WaitList Current Capacity : {this.props.course.current_waitlist}</p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
    )}
}

export default CourseCard;