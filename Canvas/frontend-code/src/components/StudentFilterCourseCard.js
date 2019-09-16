import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class FilterCourseCard extends React.Component {
    constructor(){
        super();
    }

    render() {
        let course_primary_id = this.props.course.id
        let current_capacity = this.props.course.current_capacity
        let capacity = this.props.course.capacity
        // console.log(current_capacity,capacity)
        let capacity_flag = (current_capacity < capacity)
        let waitlist_full = this.props.course.current_waitlist >= this.props.course.waitlist_capacity
        // console.log("waitlist_full",waitlist_full);
        let open_course = true
        if (!this.props.enroll && this.props.course.status != "enrolled"){
            open_course = false;
        }
        console.log("Open course",open_course)
        return (
            <div className="card col-md-3 shadow p-3 mb-5 bg-white rounded" style={{marginRight:"5%",marginLeft:"3%"}}>
                <div className="card-body">
                    <h5 className="card-text" id={this.props.course.id} onClick={this.props.courseClickHandler}>
                        <a href="javaScript:void(0)" id={this.props.course.id}>{this.props.course.course_id} : {this.props.course.name}</a>
                    </h5><hr></hr>
                    <p className="card-text" style={{fontWeight:"400"}}>Department : {this.props.course.dept}</p>
                    <p className="card-text" style={{fontWeight:"400"}}>Term : {this.props.course.term}</p>
                    <p className="card-text" style={{fontWeight:"400"}}>Description : {this.props.course.description}</p>
                    <p className="card-text" style={{fontWeight:"400"}}>Room Number : {this.props.course.room}</p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
                {this.props.enroll ? (
                    capacity_flag ? (
                        <div className="form-group">
                            <button style={{backgroundColor:"#007dc1",color:"#fff",width:"40%",marginLeft:"26%"}} className="form-control" id={course_primary_id} onClick = {this.props.enrollFunction}>Enroll</button>
                        </div>
                    ): (
                        waitlist_full ? (
                            <div className="form-group">
                                <button style={{backgroundColor:"grey",color:"#fff",width:"40%",marginLeft:"26%"}} className="form-control" id={course_primary_id} disabled>Full</button>
                            </div>
                        ) : (
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Permission#" style={{width:"40%",marginLeft:"26%",marginBottom:"2%",textAlign:"center"}} name="permission_code" onChange={this.props.permissionCodeChangeHandler}/>
                                <button style={{backgroundColor:"#007dc1",color:"#fff",width:"40%",marginLeft:"26%"}} className="form-control" id={course_primary_id} onClick = {this.props.waitlistFunction}>{this.props.waitlist_button}</button>
                            </div>
                        )
                    )
                ) : ( 
                    this.props.course.status == "enrolled" ? (
                        <div className="form-group">
                            <button style={{backgroundColor:"#007dc1",color:"#fff",width:"40%",marginLeft:"26%"}} className="form-control" id={course_primary_id} onClick = {this.props.dropFunction}>Drop</button>
                        </div>
                    ) : (
                        <div className="form-group">
                            <button style={{backgroundColor:"grey",color:"#fff",width:"40%",marginLeft:"26%"}} className="form-control" id={course_primary_id} disabled>Waitlisted</button>
                        </div>
                    )

                )}

            </div>
    )}
}

export default FilterCourseCard;