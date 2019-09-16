import axios from "axios";

export function postLogin(data,cb) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/login',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                console.log("Response is ",response)
                // console.log("Response",response);
                if(response.status === 200){
                    dispatch({type:"WRITE_LOGIN",payload:{
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                    }})
                    console.log("Updated\n")
                    localStorage.setItem("token",response.data.token);
                    localStorage.setItem('user_id',response.data.user.id)
                    localStorage.setItem('user_email',response.data.user.email)
                    localStorage.setItem('user_name',response.data.user.name)
                    if(response.data.user.profile_pic){
                        localStorage.setItem('user_profile_pic',response.data.user.profile_pic)
                    }
                    else{
                        localStorage.setItem('user_profile_pic',"https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg")
                    }
                    if (response.data.user.is_faculty == 1){
                        localStorage.setItem('user_is_faculty',true)
                    }
                    else{
                        localStorage.setItem('user_is_faculty',false)
                    }
                    cb();
                    // console.log(localStorage);
                    
                }else{
                    dispatch({type:"WRITE_LOGIN",payload:{
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    }})
                }
            })
            .catch(error => {
                console.log("error",error)
                dispatch({type:"WRITE_LOGIN",payload:{
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                }})
            });
    }
}


export function writeLogin(data) {
    return function(dispatch){
        dispatch({type:"WRITE_LOGIN",payload:data})
    }
}