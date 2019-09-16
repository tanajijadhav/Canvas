import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router'

class Logout extends React.Component {
    componentDidMount(){
        localStorage.clear();
        axios.get('http://18.191.237.120:3001/logout',{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                this.props.history.push("/login");
        });
    }

    render() {
        return (
                <div></div>
    )}
}

export default Logout;