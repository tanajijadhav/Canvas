import React from 'react';
import { withRouter } from 'react-router';
import {connect} from "react-redux"
import CourseSideBar from "../components/CourseSideBar"
import StudentGradeComponent from "./studentGradeComponent"
import getGrade from "../actions/gradeActions"

class StudentGrade extends React.Component {

    componentDidMount(){
            console.log("Idar")
            this.props.getGrade(this.props.match.params.course_id)
        }

    render() {

        let studentGrades = this.props.studentGrades || {}
        console.log("Student rades,",studentGrades)
        let total_marks = 0
        let total_out_of = 0
        let percent_obtained = 0;
        let grade_list = null
        
        if(Object.keys(studentGrades).length !== 0){
            
            grade_list = studentGrades.grades.map((grade) =>{
                if(grade.score_obtained){
                    total_marks += parseInt(grade.score_obtained)
                    total_out_of += parseInt(grade.out_of)
                }
                return <StudentGradeComponent grade={grade} />
            });

            if (total_marks != 0 && total_out_of!=0 ){
                percent_obtained = (total_marks/total_out_of) * 100
            }
        }
        
        // console.log(percent_obtained)

        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="grades" />
                <div class="content" >
                    <h5>Grades</h5>
                    <div style={{overflowX:"hidden",overflowY:"scroll",height:"80%"}}>
                        <hr></hr>
                        <div className="row text-muted">
                            <div className="col-md-3">
                            Title
                            </div>
                            <div className="col-md-3">
                            Due Date
                            </div>
                            <div className="col-md-3">
                            Score
                            </div>
                            <div className="col-md-3">
                            Out of
                            </div>
                        </div>
                        {grade_list}<hr></hr>
                        <div className="row" style={{fontWeight:"600"}}>
                            <div className="col-md-3">
                                Total
                            </div>
                            <div className="col-md-3">
                                
                            </div>
                            <div className="col-md-3">
                                {total_marks} / {total_out_of}
                            </div>
                            <div className="col-md-3">
                                {percent_obtained} %
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        studentGrades :  (state.studentGrades||{}).studentGrades,
    //   error: (state.authReducer||{}).error,
    }
  }
  StudentGrade = connect(
    mapStateToProps,
    {getGrade}
  )(StudentGrade)
  export default withRouter(StudentGrade);
