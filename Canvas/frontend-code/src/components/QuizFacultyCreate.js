import React from 'react';
import { withRouter } from 'react-router';
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"
import QuizQuestion from "../components/QuizQuestion"
import {write,postQuiz} from "../actions/quizFacultyCreateActions"

class QuizFacultyCreate extends React.Component {
    constructor(){
        super();

        this.addQuestionHandler = this.addQuestionHandler.bind(this);
        this.correctAnswerHandler = this.correctAnswerHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.writeHandler = this.writeHandler.bind(this);
    } 

    questionstoreHandler = (index,value) => {
        let temp = null
        if ( this.props.quizFacultyCreate.question_choice_list[index] !== void 0 ) { /* void 0 === undefined */
            this.props.quizFacultyCreate.question_choice_list[index].question = value
        }
        else{
            temp = {}
            temp["question"] = value
            this.props.quizFacultyCreate.question_choice_list[index] = temp
        }
        this.props.write({
            question_choice_list :  this.props.quizFacultyCreate.question_choice_list
        })
    }

    choice1Handler = (index,value) => {
        let temp = null
        if ( this.props.quizFacultyCreate.question_choice_list[index] !== void 0 ) { /* void 0 === undefined */
            this.props.quizFacultyCreate.question_choice_list[index].choice1 = value
        }
        else{
            temp = {}
            temp["choice1"] = value
            this.props.quizFacultyCreate.question_choice_list[index] = temp
        }
        this.props.write({
            question_choice_list :  this.props.quizFacultyCreate.question_choice_list
        })
    }

    choice2Handler = (index,value) => {
        let temp = null
        if ( this.props.quizFacultyCreate.question_choice_list[index] !== void 0 ) { /* void 0 === undefined */
            this.props.quizFacultyCreate.question_choice_list[index].choice2 = value
        }
        else{
            temp = {}
            temp["choice2"] = value
            this.props.quizFacultyCreate.question_choice_list[index] = temp
        }
        this.props.write({
            question_choice_list :  this.props.quizFacultyCreate.question_choice_list
        })
    }

    choice3Handler = (index,value) => {
        let temp = null
        if ( this.props.quizFacultyCreate.question_choice_list[index] !== void 0 ) { /* void 0 === undefined */
            this.props.quizFacultyCreate.question_choice_list[index].choice3 = value
        }
        else{
            temp = {}
            temp["choice3"] = value
            this.props.quizFacultyCreate.question_choice_list[index] = temp
        }
        this.props.write({
            question_choice_list :  this.props.quizFacultyCreate.question_choice_list
        })
    }

    choice4Handler = (index,value) => {
        let temp = null
        if ( this.props.quizFacultyCreate.question_choice_list[index] !== void 0 ) { /* void 0 === undefined */
            this.props.quizFacultyCreate.question_choice_list[index].choice4 = value
        }
        else{
            temp = {}
            temp["choice4"] = value
            this.props.quizFacultyCreate.question_choice_list[index] = temp
        }
        this.props.write({
            question_choice_list :  this.props.quizFacultyCreate.question_choice_list
        })
    }

    correctAnswerHandler = (index,value) => {
        let temp = null
        if ( this.props.quizFacultyCreate.question_choice_list[index] !== void 0 ) { /* void 0 === undefined */
            this.props.quizFacultyCreate.question_choice_list[index].answer = value
        }
        else{
            temp = {}
            temp["answer"] = value
            this.props.quizFacultyCreate.question_choice_list[index] = temp
        }
        this.props.write({
            question_choice_list :  this.props.quizFacultyCreate.question_choice_list
        })
    }

    deleteQuestion = index => {
        // console.log("dleete question")
        // console.log(index,this.state.question_choice_list)
        let ql = JSON.parse(JSON.stringify(this.props.quizFacultyCreate.question_list));
        ql.splice(index,1)
        
        let qlc = JSON.parse(JSON.stringify(this.props.quizFacultyCreate.question_choice_list));
        qlc.splice(index,1)

        this.props.write({
            question_list :ql,
            question_choice_list :qlc
        })

        if(ql.length <= 0){
            document.getElementById("create_button").disabled = true
        }
        else{
            document.getElementById("create_button").disabled = false
        }        
    }

    addQuestionHandler = (e) => {   
        this.props.write({
            question_list : [...this.props.quizFacultyCreate.question_list,""]
        })

        if(this.props.quizFacultyCreate.question_list.length < 0){
            document.getElementById("create_button").disabled = true
        }
        else{
            document.getElementById("create_button").disabled = false
        }
    }

    writeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.write(data);
    }
    

    submitHandler = (e) => {
        e.preventDefault();
        var headers = new Headers();
        const data = {
            title : this.props.quizFacultyCreate.title,
            description : this.props.quizFacultyCreate.description,
            start_date : this.props.quizFacultyCreate.start_date,
            end_date : this.props.quizFacultyCreate.end_date,
            question_choice_list : this.props.quizFacultyCreate.question_choice_list,
            marks : this.props.quizFacultyCreate.marks,
            course : this.props.match.params.course_id,
        }

        this.props.postQuiz(data,this.props.match.params.course_id,this.props.history)
    }

    render() {
        
        let quizFacultyCreate = this.props.quizFacultyCreate ||{};

        let quiz_url = "/course/"+this.props.match.params.course_id+"/quiz"

        let question_divs = quizFacultyCreate.question_list.map((elem,index) =>{
            // console.log("QUESTIONNNN  ::: ",this.state.question_choice_list[index]);
            return <QuizQuestion index={index} deleteQuestion={this.deleteQuestion} questionstoreHandler={this.questionstoreHandler} choice1Handler={this.choice1Handler} choice2Handler={this.choice2Handler} choice3Handler={this.choice3Handler} choice4Handler={this.choice4Handler} correctAnswerHandler={this.correctAnswerHandler} fieldvalues={quizFacultyCreate.question_choice_list[index]}/>
        });

        return (
                <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded" style={{height:"auto",overflowY:"auto"}}>
                    <CourseSideBar active="quiz" />
                    <div class="content">
                            <div className="form-group" style={{float:"right",marginTop:"-45px",marginTop:"5px"}}>
                                <a href={quiz_url}><button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}}>Back</button></a>
                            </div>
                        <form id="quiz_form" style={{width:"80%",marginLeft:"10%"}} onSubmit = {this.submitHandler}>
                            <h2>Quiz</h2><hr></hr>
                            <div class={quizFacultyCreate.alertClass} style={{display: quizFacultyCreate.first ? "none" : "block"}}>
                                <small>
                                    {quizFacultyCreate.message}
                                </small>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" required  placeholder="Title" name="title"  onChange = {this.writeHandler} />
                            </div>
                            <div className="form-group">
                                <textarea class="form-control" rows="3" placeholder="Description" name="description" onChange = {this.writeHandler} required></textarea>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" required  placeholder="Max Marks" name="marks" onChange = {this.writeHandler} />
                            </div>
                            <div className="form-group">
                                <input type="datetime-local" className="form-control" required   placeholder="Start Date" name="start_date" onChange = {this.writeHandler} ></input>
                            </div>
                            <div className="form-group">
                                <input type="datetime-local" className="form-control" required   placeholder="End Date" name="end_date" onChange = {this.writeHandler} ></input>
                            </div><hr></hr>
                            <div className="form-group">
                                <button id="add_question" type="button" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick = {this.addQuestionHandler} >Add New Question</button>
                            </div>
                            {question_divs}
                            <hr></hr>
                            <div className="form-group">
                                <button id="create_button" type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} disabled>Create</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        quizFacultyCreate :  (state.quizFacultyCreate||{}).quizFacultyCreate,
    //   error: (state.authReducer||{}).error,
    }
  }
  QuizFacultyCreate = connect(
    mapStateToProps,
    {write,postQuiz}
  )(QuizFacultyCreate)
  export default withRouter(QuizFacultyCreate);
