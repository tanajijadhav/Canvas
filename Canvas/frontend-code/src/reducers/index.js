import {combineReducers} from "redux"

import profile from "./profileReducer"
import register from "./registerReducer"
import login from "./loginReducer"
import facultyLanding from "./facultyLandingReducer"
import studentLanding from "./studentLandingReducer"
import assignment from "./assignmentReducer"
import assignmentCreate from "./assignmentCreateReducer"
import assignmentFacultyDetail from "./assignmentFacultyDetailReducer"
import assignmentGrade from "./assignmentFacultyGradeReducer"
import assignmentStudentDetail from "./assignmentStudentDetailReducer"
import announcementStudent from "./announcementStudentReducer"
import announcementFaculty from "./announcementFacultyReducer"
import quizFacultyCreate from "./quizFacultyCreateReducer"
import quizStore from  "./quizListingReducer"
import quizTake from "./quizStudentTakeReducer"
import studentGrades from "./gradeReducer"
import people from "./peopleReducer"
import permissionCode from "./permissionCodeReducer"
import inbox from "./indoxReducer"
import courseFile from "./courseFileReducer"
import courseHome from "./courseHomeReducer"

const reducer = combineReducers({
    profile,login,register,facultyLanding,studentLanding,assignment,assignmentCreate,assignmentFacultyDetail,
    assignmentGrade,assignmentStudentDetail,announcementStudent,announcementFaculty,quizFacultyCreate,quizStore,
    quizTake,studentGrades,people,permissionCode,inbox,courseFile,courseHome
})

export default reducer;