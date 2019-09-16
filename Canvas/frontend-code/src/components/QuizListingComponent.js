import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import moment from 'moment';

class QuizListingComponent extends React.Component {

    render() {
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
                        Out of {this.props.quiz.marks}
                    </div>
                </div>
            </div>
    )}
}

export default QuizListingComponent;

