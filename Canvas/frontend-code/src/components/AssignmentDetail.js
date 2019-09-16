import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import validateToken from './Auth'

import StudentAssignmentDetail from "../components/StudentAssignmentDetail"
import AssignmentFacultyDetail from "../components/AssignmentFacultyDetail"

class AssignmentDetail extends React.Component {
    constructor(){
        super();
    }

    render() {
        const is_faculty = localStorage.getItem("user_is_faculty")

        let assignmentdetail = null;
        if(is_faculty == 'true'){
            assignmentdetail = <AssignmentFacultyDetail />;
        }
        else{
            assignmentdetail = <StudentAssignmentDetail  />;
        }
        return (    
            <div>
                {validateToken()}
                {assignmentdetail}
            </div>  
    )}
}

export default AssignmentDetail;