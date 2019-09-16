import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import validateToken from './Auth'
import { withRouter } from 'react-router';
import Datetime from 'react-datetime';

import CourseSideBar from "../components/CourseSideBar"

class QuizQuestion extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props)
    }
     render() {
        let fieldvalues = this.props.fieldvalues
        let question_value =  null
        let choice1_value = null
        let choice2_value = null
        let choice3_value = null
        let choice4_value = null
        let correct_answer_value = null
        if (fieldvalues !== undefined){
            if (Object.keys(fieldvalues).length !== 0){
                question_value =  fieldvalues.question
                choice1_value = fieldvalues.choice1
                choice2_value = fieldvalues.choice2
                choice3_value = fieldvalues.choice3
                choice4_value = fieldvalues.choice4
                correct_answer_value = fieldvalues.answer
            }
        }
        
        return (
            <div>
                <hr></hr>
                <div className="row">
                    <div style={{marginLeft:"100%"}}>
                    <button type="button" class="btn btn-danger" onClick={() => this.props.deleteQuestion(this.props.index)} key={this.props.index}>Remove</button>
                    </div>
                    <div className="col-md-1">
                        <label>Question</label>
                    </div>
                    <div className="col-md-11">
                        <div className="form-group">
                            <input type="text" required className="form-control" onChange={e => this.props.questionstoreHandler(this.props.index,e.target.value)} key={this.props.index} value={question_value}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <label>Choice A</label>
                    </div>
                    <div className="col-md-11">
                        <div className="form-group">
                            <input type="text" required className="form-control" onChange={e => this.props.choice1Handler(this.props.index,e.target.value)}  key={this.props.index} value={choice1_value} />
                        </div>
                    </div>
                </div><div className="row">
                    <div className="col-md-1">
                        <label>Choice B</label>
                    </div>
                    <div className="col-md-11">
                        <div className="form-group">
                            <input type="text" required className="form-control"  onChange={e => this.props.choice2Handler(this.props.index,e.target.value)}  key={this.props.index} value={choice2_value}/>
                        </div>
                    </div>
                </div><div className="row">
                    <div className="col-md-1">
                        <label>Choice C</label>
                    </div>
                    <div className="col-md-11">
                        <div className="form-group">
                            <input type="text" required className="form-control" onChange={e => this.props.choice3Handler(this.props.index,e.target.value)} key={this.props.index} value={choice3_value}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <label>Choice D</label>
                    </div>
                    <div className="col-md-11">
                        <div className="form-group">
                            <input type="text" required className="form-control" onChange={e => this.props.choice4Handler(this.props.index,e.target.value)} key={this.props.index} value={choice4_value}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <label>Correct Answer</label>
                    </div>
                    <div className="col-md-11">
                        <div className="form-group">
                            <input type="text" required className="form-control" onChange={e => this.props.correctAnswerHandler(this.props.index,e.target.value)} key={this.props.index} value={correct_answer_value}/>
                        </div>
                    </div>
                </div>
            </div>
    )}
}

export default withRouter(QuizQuestion);