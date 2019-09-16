import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Login from "./Login"
import Register from "./Register"
import Profile from "./Profile"
import Faculty from "./FacultyLanding"
import SideBar from './Sidebar';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                <SideBar />
                <div id="page-wrap">
                    {/*Render Different Component based on Route*/}
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/faculty" component={Faculty}/>
                </div>
            </div>
        )
    }
}
//Export The Main Component
export default Main;