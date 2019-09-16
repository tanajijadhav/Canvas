import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Faculty from "./FacultyLanding"
import Student from "./StudentLanding"
import SideBar from './Sidebar';
import validateToken from './Auth'

class Home extends React.Component {

    render() {
        const is_faculty = localStorage.getItem("user_is_faculty")
        let home = null;
        if(is_faculty == 'true'){
            home = <Faculty  />;
        }
        else{
            home = <Student />;
        }
        return (    
            <div>
                {validateToken()}
                <SideBar />
                {home}
            </div>  
    )}
}

export default Home;