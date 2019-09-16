import React, {Component} from 'react';
import {Route} from 'react-router-dom';


// import Announcements from "../components/Announcements"

//Create a Main Component
class RedirectLogin extends Component {
    componentDidMount(){
        this.props.history.push("/login");
    }
    render(){
        return(
            <div>
            </div>
        )
    }    
}
//Export The Main Component
export default RedirectLogin;