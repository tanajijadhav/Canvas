import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Login from "./Login"
import Logout from "./Logout"
import Register from "./Register"
import Profile from "./Profile"
import Home from "./Home"
import CourseMain from './CourseMain'
import Inbox from "./Inbox"

// import Announcements from "../components/Announcements"

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                <div id="page-wrap">
                    {/*Render Different Component based on Route*/}
                    <Route path="/" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/course" component={CourseMain}/>
                    <Route path="/conversations" component={Inbox}/>
                    {/* <Route path="/announcements" component={Announcements}/> */}
                </div>
            </div>
        )
    }
}
//Export The Main Component
export default Main;