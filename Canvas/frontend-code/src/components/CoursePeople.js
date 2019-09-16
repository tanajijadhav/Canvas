import React from 'react';
import axios from 'axios';
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"
import { Pagination } from 'react-bootstrap';

import CourseSideBar from "../components/CourseSideBar"

import PeopleListing from "../components/PeopleListing"
import {getPeople,dropStudent,write} from "../actions/peopleActions"



class People extends React.Component {
    constructor(){
        super();
        
        this.removeStudentHandler = this.removeStudentHandler.bind(this);
        this.onclickPageNumber = this.onclickPageNumber.bind(this);
    }

    onclickPageNumber = (e) => {
        // console.log("Active page",e.target.id)
        let index = e.target.id
        this.props.write({
            page_number : index
        })
        this.props.getPeople(this.props.match.params.course_id,index) 
    }

    componentDidMount(){
        this.props.getPeople(this.props.match.params.course_id,this.props.people.page_number)     
    }

    removeStudentHandler = (e) => {
        // console.log("e",e.target.id)
        let data = {}
        data['course_primary_id'] = this.props.match.params.course_id
        data['from_faculty'] = true
        data["student_id"] = e.target.id
        this.props.dropStudent(data,this.props.match.params.course_id,this.props.people.page_number);
        // this.props.history.push("/course/"+this.props.match.params.course_id+"/quiz/"+e.target.id+"/take");
    } 

    render() {   
        let people = this.props.people || {}
        let course_name = people.course.name
        // console.log(this.state)
        const profressor_comp = <PeopleListing profile_pic={people.profressor.profile_pic} name={people.profressor.name} role="Profressor" course={course_name} />
        const student_list = people.student.map((student) =>{
            return <PeopleListing profile_pic={student.profile_pic} student_id={student.id} name={student.name} role="Student" course={course_name} removeStudentHandler={this.removeStudentHandler} />
        })

        let page_limit = 10
        let active = people.page_number
        let paginated_items = [];
        let page_count = parseInt(Math.ceil(this.props.people.page_count / page_limit))
        for (let number = 1; number <= page_count; number++) {
            paginated_items.push(
            <Pagination.Item key={number} id={number} active={number == active} onClick={this.onclickPageNumber} >
            {number}
            </Pagination.Item>,
        );
        }

        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="people" />
                <div class="content">
                    <h5>People</h5>
                    <div class={people.alertClass} style={{display: people.first ? "none" : "block",left:"37%",marginTop:"3%",width:"30%"}}>
                        <small>
                        {people.message}
                        </small>
                    </div>
                    {profressor_comp}
                    {student_list}<hr></hr>
                    <Pagination style={{marginTop:"10pc",marginLeft:"43pc"}}>{paginated_items}</Pagination>
                </div>
            </div>
        )}
    }

const mapStateToProps = (state) => {
    return {
        people :  (state.people||{}).people,
    //   error: (state.authReducer||{}).error,
    }
  }
  People = connect(
    mapStateToProps,
    {getPeople,dropStudent,write}
  )(People)
  export default withRouter(People);
