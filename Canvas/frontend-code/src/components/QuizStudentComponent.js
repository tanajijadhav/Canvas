import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import moment from 'moment';

class QuizStudentComponent extends React.Component {

    render() {
        let taken = this.props.quiz.taken
        let quiz_action = null
        if(taken){
            quiz_action = "Marks : "+this.props.quiz.score_obtained + "/" + this.props.quiz.marks
        }
        else{
            let end_date = new Date(this.props.quiz.end_date).getTime();
            let today_date = new Date().getTime();
            // console.log(end_date,today_date)
            if(end_date>=today_date){
                quiz_action = (
                <div className="form-group">
                    <button id="start_button" id={this.props.quiz.id} type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick={this.props.startQuizHandler} >Start</button>
                </div> 
                )
            }
            else{
                quiz_action = (
                    <div className="form-group">
                        <button id="over_button" type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} disabled>Over</button>
                    </div>  
                )
            }
        }

        return (
            <div>
                <hr></hr><div className="row">
                    <div className="col-md-1">
                        <img src="https://thumbs.dreamstime.com/z/green-quiz-icon-white-background-78373045.jpg" alt="#" style={{borderRadius:"50%",width:"40%",height:"70%"}}></img>
                    </div>
                    <div className="col-md-9" style={{float:"left",textAlign:"left"}}>
                    <h6 style={{marginLeft:"-50px",fontWeight:"400",marginBottom:"-20px"}}>
                        {this.props.quiz.title}
                    </h6><br></br>
                    <h7 className="text-muted" style={{fontWeight:"400",marginLeft:"-49px"}}>
                        {this.props.quiz.description}
                    </h7>
                    </div>
                    <div className="col-md-2">
                        {quiz_action}
                    </div>
                </div>
            </div>
    )}
}

export default QuizStudentComponent;

