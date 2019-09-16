import axios from "axios";

export function postAssignment(course,data,form_obj) {
    return function(dispatch){
        axios.post(`http://18.191.237.120:3001/${course}/assignment/create`,data,{ headers: { token: localStorage.getItem("token") } })
            .then(response => {
                // console.log("Try")console
                console.log("Status Code : ",response.data);
                if(response.status === 200){
                    dispatch({type:"WRITE_ASSIGNMENT",payload:{
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                        success : true,
                    }})
                    form_obj.reset();
                }else{
                    dispatch({type:"WRITE_ASSIGNMENT",payload:{
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    }})
                }
            })
            .catch(error => {
                dispatch({type:"WRITE_ASSIGNMENT",payload:{
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                }})
            });
    }
}


export function writeAssignment(data) {
    return function(dispatch){
        dispatch({type:"WRITE_ASSIGNMENT",payload:data})
    }
}