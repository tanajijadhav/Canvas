import axios from "axios";

export function postRegister(data,cb) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/register',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                console.log("Response",response.data);
                if(response.status === 200){
                    dispatch({type:"WRITE_REGISTER",payload:{
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                    }})
                    cb();
                    // console.log(localStorage);
                    
                }else{
                    dispatch({type:"WRITE_REGISTER",payload:{
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    }})
                }
            })
            .catch(error => {
                dispatch({type:"WRITE_REGISTER",payload:{
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                }})
            });
    }
}


export function writeRegister(data) {
    return function(dispatch){
        dispatch({type:"WRITE_REGISTER",payload:data})
    }
}