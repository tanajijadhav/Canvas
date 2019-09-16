import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import validateToken from './Auth'

class Faculty extends React.Component {
    constructor(){
        super();

        this.state = {
            course_name : null,
            course_dept : null,
            course_desc : null,
            course_term : null,
            course_room : null,
            course_capacity : 0,
            course_waitlist_capacity : 0,
        }

        this.courseNameChangeHandler = this.courseNameChangeHandler.bind(this);
        this.courseDeptChangeHandler = this.courseDeptChangeHandler.bind(this);
        this.courseDescChangeHandler = this.courseDescChangeHandler.bind(this);
        this.courseTermChangeHandler = this.courseTermChangeHandler.bind(this);
        this.courseRoomChangeHandler = this.courseRoomChangeHandler.bind(this);
        this.courseCapacityChangeHandler = this.courseCapacityChangeHandler.bind(this);
        this.courseWaitListChangeHandler = this.courseWaitListChangeHandler.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    componentDidMount(){
        
    }

    courseNameChangeHandler = (e) => {
        this.setState({
            course_name : e.target.value
        })
    }

    courseDeptChangeHandler = (e) => {
        this.setState({
            course_dept : e.target.value
        })
    }

    courseDescChangeHandler = (e) => {
        this.setState({
            course_desc : e.target.value
        })
    }

    courseTermChangeHandler = (e) => {
        this.setState({
            course_term : e.target.value
        })
    }

    courseRoomChangeHandler = (e) => {
        this.setState({
            course_room : e.target.value
        })
    }

    courseCapacityChangeHandler = (e) => {
        this.setState({
            course_capacity : e.target.value
        })
    }

    courseWaitListChangeHandler = (e) => {
        this.setState({
            course_waitlist_capacity : e.target.value
        })
    }
    

    createCourse = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            course_name : this.state.course_name,
            course_dept : this.state.course_dept,
            course_desc : this.state.course_desc,
            course_term : this.state.course_term,
            course_room : this.state.course_room,
            course_capacity : this.state.course_capacity,
            course_waitlist_capacity : this.state.course_waitlist_capacity
        }
        //make a post request with the user data
        axios.post('http://18.191.237.120:3001/course',data)
            .then(response => {
                console.log(response.status)
                if(response.status === 200){
                    console.log("Inside if")
                    document.getElementById("add-course-form").reset();
                }else{
                    console.log("Inside else")
                }
            })
            .catch(error => {
                console.log("Inside catch")
            });
    }

    render() {
        validateToken();

        return (

            <div>
                <div className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                    <h1>Dashboard</h1><hr></hr>
                    <div className="card-body">
                        <div>
                            <div className="row" style={{marginRight:"0px",marginLeft:"0px"}}>
                                <div class="card col-md-3 shadow p-3 mb-5 bg-white rounded" style={{marginRight:"5%",marginLeft:"3%"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5><hr></hr>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                                <div class="card col-md-3 shadow p-3 mb-5 bg-white rounded" style={{marginRight:"5%",marginLeft:"3%"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5><hr></hr>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                                <div class="card col-md-3 shadow p-3 mb-5 bg-white rounded" style={{marginRight:"5%",marginLeft:"3%"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5><hr></hr>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        </div><hr></hr>
                        <div>
                            <h4 style={{paddingTop:"10px",paddingBottom:"3%"}}>Add Course</h4>
                            <form id="add-course-form">
                                <div className="row">
                                    <div className="form-group" style={{width:"24%",marginRight:"5%",marginLeft:"10%",marginBottom:"3%"}}>
                                        <input type="text" className="form-control" placeholder="Name" onChange = {this.courseNameChangeHandler} value={this.state.name}/>
                                    </div>
                                    <div className="form-group" style={{width:"24%",marginRight:"5%"}}>
                                        <input type="text" className="form-control" placeholder="Department" onChange = {this.courseDeptChangeHandler} value={this.state.name}/>
                                    </div>
                                    <div className="form-group" style={{width:"24%",marginRight:"5%"}}>
                                        <input type="text" className="form-control" placeholder="Description" onChange = {this.courseDescChangeHandler} value={this.state.name}/>
                                    </div>
                                    <div className="form-group" style={{width:"24%",marginRight:"5%",marginLeft:"10%"}}>
                                        <select class="custom-select" placeholder="Term" onChange = {this.courseTermChangeHandler} value={this.state.gender}>
                                            <option value="" disabled selected>Term</option>
                                            <option value="Spring">Spring</option>
                                            <option value="Fall">Fall</option>
                                        </select>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"4%"}}>
                                        <input type="text" className="form-control" placeholder="Room" onChange = {this.courseRoomChangeHandler} value={this.state.name}/>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"4%"}}>
                                        <input type="text" className="form-control" placeholder="Course Capacity" onChange = {this.courseCapacityChangeHandler} value={this.state.name}/>
                                    </div>
                                    <div className="form-group" style={{width:"15%",marginRight:"1%"}}>
                                        <input type="text" className="form-control" placeholder="Waitlist Capacity" onChange = {this.courseWaitListChangeHandler} value={this.state.name}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button style={{backgroundColor:"#007dc1",color:"#fff",width:"16%",marginLeft:"41%",marginTop:"2%"}} className="form-control" onClick = {this.createCourse}>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )}
}

export default Faculty;