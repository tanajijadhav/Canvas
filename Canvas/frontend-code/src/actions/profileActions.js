import axios from "axios";

export function getProfile() {
    return function(dispatch){
        axios.get('http://18.191.237.120:3001/profile',{ headers: { token: localStorage.getItem("token") } })
        .then((response)=>{
            dispatch({type:"GET_PROFILE",payload:response.data.user})
        })
        .catch(err=>{
            console.log("Error \n",err)
            dispatch({type:"ERROR",payload:err})
        })
    }
}

export function postProfile(data) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/profile',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                console.log("Response",response.data);
                if(response.status === 200){
                    getProfile();
                    dispatch({type:"WRITE_PROFILE",payload:{
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                    }})
                }else{
                    dispatch({type:"WRITE_PROFILE",payload:{
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    }})
                }
            })
            .catch(error => {
                dispatch({type:"WRITE_PROFILE",payload:{
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                }})
            });
    }
}


export function writeProfile(data) {
    return function(dispatch){
        dispatch({type:"WRITE_PROFILE",payload:data})
    }
}