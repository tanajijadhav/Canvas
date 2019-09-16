import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router';

import CourseHome from  "../components/CourseHome"
import Announcements from "../components/Announcements"
import People from "../components/CoursePeople"
import Assignments from "../components/Assignments"
import AssignmentCreate from "../components/AssignmentCreate"
import AssignmentDetail from "../components/AssignmentDetail"
import AssignmentFacultyGradeAssignment from "../components/AssignmentFacultyGradeAssignment"
import CourseFiles from "../components/courseFile"
import Quiz from "../components/QuizMain"
import QuizFacultyCreate from "../components/QuizFacultyCreate"
import QuizStudentTake from "../components/QuizStudentTake"
import StudentGrade from "../components/StudentGrade"
import validateToken from './Auth'
import PermissionCode from "../components/PermissionCode"
import SideBar from './Sidebar';
//Create a Main Component
class CourseMain extends Component {

    render(){
        return(
            <div>
                {validateToken()}
                <SideBar />
                <div id="page-wrap">
                    {/*Render Different Component based on Route*/}
                     <Route path="/course/:course_id" component={CourseHome} />
                     <Route path="/course/:course_id/announcements" component={Announcements} />
                     <Route path="/course/:course_id/people" component={People} />
                     <Route path="/course/:course_id/assignments" component={Assignments} />
                     <Route path="/course/:course_id/assignments/create" component={AssignmentCreate} />
                     <Route path="/course/:course_id/assignments/:assignment_id/submissions" component={AssignmentDetail} />
                     <Route path="/course/:course_id/assignments/:assignment_id/submissions/view" component={AssignmentFacultyGradeAssignment} />
                     <Route path="/course/:course_id/files" component={CourseFiles} />
                     <Route path="/course/:course_id/quiz" component={Quiz} />
                     <Route path="/course/:course_id/quiz/create" component={QuizFacultyCreate} />
                     <Route path="/course/:course_id/quiz/:quiz_id/take" component={QuizStudentTake} />
                     <Route path="/course/:course_id/grades" component={StudentGrade} />
                     <Route path="/course/:course_id/permision_code" component={PermissionCode} />
                </div>
            </div>
        )
    }
}
//Export The Main Component
export default withRouter(CourseMain);