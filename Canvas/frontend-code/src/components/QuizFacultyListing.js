import React from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import { withRouter } from 'react-router';


import CourseSideBar from "../components/CourseSideBar"
import QuizListingComponent from "../components/QuizListingComponent"
import getQuiz from "../actions/quizListingActions"

class QUizFacultyListing extends React.Component {

    componentDidMount(){
        this.props.getQuiz(this.props.match.params.course_id);
    }
    
    componentDidUpdate(){
        this.props.getQuiz(this.props.match.params.course_id);
    }

    render() {

        let quizStore = this.props.quizStore || {};

        let is_faculty = localStorage.getItem("user_is_faculty")

        const quiz_list_elements = quizStore.quiz_list.map((elem) =>{
            return <QuizListingComponent quiz={elem}/>
        });

        let create_button = null;
        if(is_faculty == "true"){
            let create_url = "/course/"+this.props.match.params.course_id+"/quiz/create"
            create_button = <div className="form-group" style={{float:"right",marginTop:"-45px"}}>
                <a href={create_url}><button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}}>Create New Quiz</button></a>
            </div>
        }
        
        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="quiz" />
                <div class="content" >  
                    <span>
                        <h3>Quiz</h3>
                        {create_button}
                    </span>
                    {quiz_list_elements}
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
      quizStore :  (state.quizStore||{}).quizStore,
    //   error: (state.authReducer||{}).error,
    }
  }
  QUizFacultyListing = connect(
    mapStateToProps,
    {getQuiz}
  )(QUizFacultyListing)
  export default withRouter(QUizFacultyListing);
