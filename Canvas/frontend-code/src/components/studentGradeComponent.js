import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import moment from 'moment';

class StudentGradeComponent extends React.Component {


    render() {
        return (
            <div>
                <hr></hr><div className="row">
                    <div className="col-md-3">
                       {this.props.grade.title}
                    </div>
                    <div className="col-md-3">
                        {moment(this.props.grade.due).format('MMMM Do YYYY')}
                    </div>
                    <div className="col-md-3">
                       {this.props.grade.score_obtained}
                    </div>
                    <div className="col-md-3">
                       {this.props.grade.out_of}
                    </div>
                </div>
            </div>
    )}
}

export default StudentGradeComponent;

