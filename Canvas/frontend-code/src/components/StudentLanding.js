import React from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import { withRouter } from "react-router";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Pagination } from 'react-bootstrap';

import CourseCard from "./StudentCourseCard";
import FilterCourseCard from "./StudentFilterCourseCard"

import {getState,writeState,filterLogic,enroll,waitlist,drop} from "../actions/studentLandingActions"

import validateToken from './Auth'

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#fff' : '#fff',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

  

class Student extends React.Component {
    constructor(){
        super();

        // this.filterChangeHandler = this.filterChangeHandler.bind(this)
        this.enrollFunction = this.enrollFunction.bind(this)
        this.waitlistFunction = this.waitlistFunction.bind(this)
        this.dropFunction = this.dropFunction.bind(this)        
        this.filterValueChangeHandler = this.filterValueChangeHandler.bind(this)
        this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this)
        this.permissionCodeChangeHandler = this.permissionCodeChangeHandler.bind(this)
        // this.waitlistButtonChange = this.waitlistButtonChange.bind(this)
        this.courseClickHandler = this.courseClickHandler.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onclickPageNumber = this.onclickPageNumber.bind(this);
    }

    componentDidMount(){
        this.props.getState();
    }

    onclickPageNumber = (e) => {
        let index = e.target.id
        // console.log("Active page",index)
        this.props.writeState({
            page_number : index
        })
        this.filterSubmitLogic(index);
    }
    
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };
      

    onDragEnd(result) {
        console.log("Idar",result)
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const updated_courses_list = this.reorder(
            this.props.studentLanding.courses_list,
            result.source.index,
            result.destination.index
        );

        console.log("updated_courses_list",updated_courses_list)
    
        let data = {
            courses_list : updated_courses_list
        }
        this.props.writeState(data);
    }

    filterChangeHandler = event => {
        let data = {
            [event.target.name] : event.target.value
        }
        this.props.writeState(data);

        if(event.target.value == "term"){
            document.getElementById("select_div").style.display = "block";
            document.getElementById("input_div").style.display = "none";
            document.getElementById("greater_than_checkbox").style.display = "none";
            document.getElementById("id_name_input_field").placeholder = ""
            document.getElementById("filter_div").style.left = "39%"
        }
        else if(event.target.value == "id"){
            document.getElementById("input_div").style.display = "block";
            document.getElementById("select_div").style.display = "none";
            document.getElementById("greater_than_checkbox").style.display = "block";
            document.getElementById("id_name_input_field").placeholder = "Enter Course ID"
            document.getElementById("filter_div").style.left = "34%"
        }
        else{
            document.getElementById("input_div").style.display = "block";
            document.getElementById("select_div").style.display = "none";
            document.getElementById("greater_than_checkbox").style.display = "none";
            document.getElementById("id_name_input_field").placeholder = "Enter Course Name"
            document.getElementById("filter_div").style.left = "34%"
        }
    }

    filterValueChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeState(data);
    }

    permissionCodeChangeHandler = (e) => {

        if (e.target.value == null || e.target.value == ""){
            let data = {
                [e.target.name] : e.target.value,
                waitlist_button : "Waitlist"
            }
            this.props.writeState(data);
        }
        else{
            let data = {
                [e.target.name] : e.target.value,
                waitlist_button : "Enroll"
            }
            this.props.writeState(data);
        }
    }

    checkboxChangeHandler = (e) => {
        let data = {
            greater_by : e.target.checked
        }
        this.props.writeState(data);
    }

    courseClickHandler = (e) => {
        let course_id = e.target.id;
        let course_status = e.target.getAttribute("data-val");
        console.log(e.target)
        console.log(course_status)
        // let data = {course_id:course_id}
        if(course_status == "enrolled"){
            this.props.history.push("/course/"+course_id);
        }
    }

    pagination_logic_for_length_one = () => {
        let temp_page_number = this.props.studentLanding.page_number
        if(this.props.studentLanding.filter_courses_list.length == 1){
            if(this.props.studentLanding.filter_courses_list.length-1 > 0){
                this.props.writeState({
                    page_number : (this.props.studentLanding.filter_courses_list.length-1)
                })
                temp_page_number -= 1
            }
            else{
                this.props.writeState({
                    page_number : 1
                })
                temp_page_number = 1
            }
        }
        return temp_page_number
    }

    filterSubmitLogic = (index) => {
        let temp_page_number = this.pagination_logic_for_length_one()
        let page = null
        if(index === undefined){
            page = temp_page_number
        }
        else{
            page = index
        }
        const data = {
            filter_by : this.props.studentLanding.filter_by,
            filter_value : this.props.studentLanding.filter_value,
            greater_than : this.props.studentLanding.greater_by,
            page : page,
        }
        // console.log("sending data",data)
        this.props.filterLogic(data)
    }

    filterSubmit = (e) => {
        var headers = new Headers();
        e.preventDefault();
        this.filterSubmitLogic();
    }

    enrollFunction = e => {
        e.preventDefault();
        let data = {}
        data['course_primary_id'] = e.target.id

        let filter_data = {}
        filter_data['filter_by'] = this.props.studentLanding.filter_by
        filter_data['filter_value'] = this.props.studentLanding.filter_value
        filter_data['greater_than'] = this.props.studentLanding.greater_by
        filter_data['page'] = this.pagination_logic_for_length_one()
        this.props.enroll(data,filter_data)
    }

    waitlistFunction = e => {
        e.preventDefault();
        let course_primary_id = e.target.id
        let data = {}
        data['course_primary_id'] = e.target.id
        data['permission_code'] = this.props.studentLanding.permission_code
        
        let filter_data = {}
        filter_data['filter_by'] = this.props.studentLanding.filter_by
        filter_data['filter_value'] = this.props.studentLanding.filter_value
        filter_data['greater_than'] = this.props.studentLanding.greater_by
        filter_data['page'] = this.pagination_logic_for_length_one()
        this.props.waitlist(data,filter_data)
    }

    dropFunction = e => {
        e.preventDefault();
        let course_primary_id = e.target.id
        let data = {}
        data['course_primary_id'] = e.target.id
        data['from_faculty'] = false
        
        let filter_data = {}
        filter_data['filter_by'] = this.props.studentLanding.filter_by
        filter_data['filter_value'] = this.props.studentLanding.filter_value
        filter_data['greater_than'] = this.props.studentLanding.greater_by
        filter_data['page'] = this.pagination_logic_for_length_one()
        this.props.drop(data,filter_data)
    }

    render() {

        let studentLandingState = this.props.studentLanding ||{};

        // console.log("studentLandingState",studentLandingState)

        // let coursesCards = null;
        let FilterCoursesCards = null;
        if (Object.keys(studentLandingState).length !== 0){
            // coursesCards = studentLandingState.courses_list.map((course) =>
            //     <CourseCard key={course.id} enroll={false} dropFunction={this.dropFunction} course={course} courseClickHandler={this.courseClickHandler} />
            // );coursesCards

            FilterCoursesCards = studentLandingState.filter_courses_list.map((course) =>
                <FilterCourseCard key={course.id} enroll={true} enrollFunction={this.enrollFunction} waitlistFunction={this.waitlistFunction} course={course} permissionCodeChangeHandler={this.permissionCodeChangeHandler} waitlist_button={studentLandingState.waitlist_button} />
            );
        }

        let page_limit = 3
        let active = studentLandingState.page_number
        let paginated_items = [];
        let page_count = parseInt(Math.ceil(studentLandingState.page_count / page_limit))
        console.log("page_count",page_count)
        for (let number = 1; number <= page_count; number++) {
            paginated_items.push(
            <Pagination.Item key={number} id={number} active={number == active} onClick={this.onclickPageNumber} >
            {number}
            </Pagination.Item>,
        );
        }

        console.log("----paginated_items----\n",paginated_items)

        return (

            <div>
                {validateToken()}
                <div className="card profile-div-center shadow p-3 mb-5 bg-white rounded" style={{minHeight:"100%"}}>
                    <h1>Dashboard</h1><hr></hr>
                    <div className="card-body">
                        <div>
                            <div style={{marginRight:"0px",marginLeft:"0px"}}>
                            {studentLandingState.is_courses && studentLandingState.courses_list.length > 0  ? 
                                // 
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                        <Droppable droppableId="droppable" direction="horizontal">
                                        {(provided, snapshot) => (
                                            <div className="row"
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                            {...provided.droppableProps}
                                            >
                                            {studentLandingState.courses_list.map((course, index) => (
                                                <CourseCard key={course.id} enroll={false} dropFunction={this.dropFunction} course={course} index={index} courseClickHandler={this.courseClickHandler} />
                                            ))}
                                            {provided.placeholder}
                                            </div>
                                        )}
                                        </Droppable>
                                </DragDropContext>
                                // 
                             : 
                                <p style={{fontWeight:"500"}}>Not enrolled into any course</p>
                            }
                            </div>
                        </div><hr></hr>
                        <div>
                            <h4 style={{paddingTop:"10px",paddingBottom:"2%"}}>Enroll</h4>
                            <form>
                                <div class="form-row align-items-center" id="filter_div" style={{marginLeft:"43%",marginBottom:"5%"}}>
                                    <div className="col-auto">
                                        <select className="custom-select" name="filter_by" onChange={this.filterChangeHandler}>
                                            <option value="" disabled selected>Filter by</option>
                                            <option value="term">Course Term</option>
                                            <option value="id">Course ID</option>
                                            <option value="name">Course Name</option>
                                        </select>
                                    </div>
                                    <div id="select_div" className="col-auto" style={{display:"none"}}>
                                        <select className="custom-select" name="filter_value" onChange={this.filterValueChangeHandler}>
                                            <option value="" disabled selected>Select Term</option>
                                            <option value="Spring">Spring</option>
                                            <option value="Fall">Fall</option>
                                        </select>
                                    </div>
                                    <div id="input_div" className="col-auto" style={{display:"none"}}>
                                        <div className="input-group">
                                            <input id="id_name_input_field" type="text" placeholder="" className="form-control" name="filter_value" onChange={this.filterValueChangeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-auto" id="greater_than_checkbox"  style={{marginLeft:"2%",display:"none"}}>
                                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" style={{zoom:1.5}} onChange={this.checkboxChangeHandler}/>
                                        <label className="form-check-label" for="defaultCheck1">
                                            Greater than
                                        </label>
                                    </div>
                                    <div className="col-auto">
                                    <button style={{backgroundColor:"#007dc1",color:"#fff",width:"100%"}} className="form-control" onClick = {this.filterSubmit}>Filter</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class={studentLandingState.alertClass} style={{display: studentLandingState.pc_first ? "none" : "block",left:"37%",height:"10%",marginTop:"-2%",marginBottom:"3%",width:"30%"}}>
                                        <small>
                                        {studentLandingState.message}
                                        </small>
                                    </div>
                                </div>
                                <div className="row" style={{marginRight:"0px",marginLeft:"0px"}}>
                                    {studentLandingState.filter_is_courses && studentLandingState.filter_courses_list.length > 0 ? (
                                        FilterCoursesCards
                                    )
                                    : 
                                        <div class={studentLandingState.alertClass} style={{display: studentLandingState.first ? "none" : "block",left:"37%",height:"10%",marginTop:"1%",width:"30%"}}>
                                            <small>
                                            {studentLandingState.message}
                                            </small>
                                        </div>
                                    }
                                </div>
                                <div className="row" style={{marginTop:"-10%"}}>
                                    <Pagination style={{marginTop:"10pc",marginLeft:"50pc"}}>{paginated_items}</Pagination>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        studentLanding :  (state.studentLanding||{}).studentLanding,
    //   error: (state.authReducer||{}).error,
    }
  }
  Student = connect(
    mapStateToProps,
    {getState,writeState,filterLogic,enroll,waitlist,drop}
  )(Student)

export default withRouter(Student);