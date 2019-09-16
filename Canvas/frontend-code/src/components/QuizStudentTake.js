import React from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import { withRouter } from 'react-router';

import CourseSideBar from "../components/CourseSideBar"
import {getQuizData,postTakeQuizData} from "../actions/quizStudentTakeActions"

class QuizStudentTake extends React.Component {
    constructor(){
        super();

        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount(){
        this.props.getQuizData(this.props.match.params.course_id,this.props.match.params.quiz_id);
    }

    submitHandler = (e) => {
        e.preventDefault();
        // console.log("e",e.target)
        let data = []
        this.props.quizTake.ques_choice.forEach(elem => {
            let temp = {}
            temp["question"] = elem.question
            temp["answer"] = e.target[elem.question].value
            data.push(temp)
        })
        this.props.postTakeQuizData(this.props.match.params.course_id,this.props.match.params.quiz_id,data,this.props.history)
    }

    render() {

        let quizTake = this.props.quizTake || {};

        let ques_choice = quizTake.ques_choice
        let quiz_elements = null
        if(ques_choice.length > 0){
            quiz_elements = ques_choice.map((elem,index) =>{
                console.log(elem)
                return (
                    <div style={{marginBottom:"3%"}}>
                        <div className="row" style={{marginLeft:"2%"}}>
                            <label>
                                <span className="text-muted">{index+1}.</span> {elem.question}
                            </label>
                        </div>
                        <div style={{marginLeft:"5%"}}>
                            <div className="row">
                                <div className="radio">
                                    <input type="radio" name={elem.question} value={elem.option1} />
                                    <label value={elem.option1}>{elem.option1}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="radio">
                                    <input type="radio" name={elem.question} value={elem.option2} />
                                    <label value={elem.option2}>{elem.option2}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="radio">
                                    <input type="radio" name={elem.question} value={elem.option3} />
                                    <label value={elem.option3}>{elem.option3}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="radio">
                                    <input type="radio" name={elem.question} value={elem.option4} />
                                    <label value={elem.option4}>{elem.option4}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        
        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded" style={{height:"auto",overflowY:"auto"}}>
                <CourseSideBar active="quiz" />
                <div class="content" >  
                    <span>
                        <h3>{quizTake.quiz_title}</h3>
                    </span><hr></hr>
                    <form onSubmit={this.submitHandler}>
                        {quiz_elements}
                        <div className="form-group" style={{paddingTop:"2%"}}>
                            <button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}}>Submit Quiz</button>
                        </div>
                    </form>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
      quizTake :  (state.quizTake||{}).quizTake,
    }
  }
  QuizStudentTake = connect(
    mapStateToProps,
    {getQuizData,postTakeQuizData}
  )(QuizStudentTake)
  export default withRouter(QuizStudentTake);
