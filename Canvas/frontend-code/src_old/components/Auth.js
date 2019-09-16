import React from 'react';
import { Redirect } from 'react-router'

var validateToken = () => {
    let token = localStorage.getItem("token")
    if (typeof token !== 'undefined'){
        <Redirect to="/login"/>
    }
}

export default validateToken;