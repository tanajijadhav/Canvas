import React from 'react';
import { Redirect } from 'react-router'


var validateToken = () => {
    let token = localStorage.getItem("token")
    // console.log("--------Token----------",!token)
    if (typeof token === 'undefined' || !token){
        return <Redirect to="/login"/>
    }
}

export default validateToken;