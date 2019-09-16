import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import validateToken from './Auth'

import CourseSideBar from "../components/CourseSideBar"
import AnnouncementsStudent from "../components/AnnouncementsStudent"
import AnnouncementsFaculty from "../components/AnnouncementsFaculty"

class Announcements extends React.Component {

    render() {
        const is_faculty = localStorage.getItem("user_is_faculty")
        console.log("is_faculty",is_faculty)
        let announcements = null;
        if(is_faculty == 'true'){
            announcements = <AnnouncementsFaculty />;
        }
        else{
            announcements = <AnnouncementsStudent  />;
        }
        return (    
            <div>
                {validateToken()}
                {announcements}
            </div>  
    )}
}

export default Announcements;