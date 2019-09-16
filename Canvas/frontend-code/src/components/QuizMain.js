import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import validateToken from './Auth'

import CourseSideBar from "../components/CourseSideBar"
import QUizFacultyListing from "../components/QuizFacultyListing"
import QUizStudentListing from "../components/QuizStudentListing"
// import AnnouncementsFaculty from "../components/AnnouncementsFaculty"

class Quiz extends React.Component {

    render() {
        let is_faculty = localStorage.getItem("user_is_faculty")
        // console.log("is_faculty",is_faculty)
        let quiz = null;
        if(is_faculty == 'true'){
            quiz = <QUizFacultyListing />;
        }
        else{
            quiz = <QUizStudentListing  />;
        }
        return (    
            <div>
                {validateToken()}
                {quiz}
            </div>  
    )}
}

export default Quiz;