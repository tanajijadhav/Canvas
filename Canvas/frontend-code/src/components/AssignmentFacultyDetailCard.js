import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import { withRouter } from 'react-router';
import moment from 'moment';

class AssignmentFacultyDetailCard extends React.Component {

    render() {
        let submissions = this.props.obj.submissions
        // console.log(submissions)
        const file_list = submissions.map((elem) =>
            ( 
                <div>
                    <div className="row">
                        <span style={{fontSize:"17px",marginBottom:"8px"}} onClick={this.props.fileView} id={elem.id}><a href="javascript:void(0)" id={elem.id}>{elem.filename}</a></span>
                    </div>
                </div>
            )
        );
        return (
            <div>
                <div className="card" style={{marginBottom:"25px",width:"80%",marginLeft:"10%",background:"floralwhite"}}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-10">
                               <h6 style={{float:"left",marginLeft:"-15px"}}>{this.props.obj.name}</h6>
                               {/* <h6 style={{float:"left",marginLeft:"-15px"}}>LOl</h6> */}
                            </div>
                            <div className="col-md-2">
                                {this.props.obj.grades}/{this.props.points}
                                {/* /10 */}
                            </div>
                        </div><hr></hr>
                        {file_list}
                    </div>
                </div>
            </div>
    )}
}

export default withRouter(AssignmentFacultyDetailCard);