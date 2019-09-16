import axios from "axios";

export function postQuiz(data,course,history) {
    return function(dispatch){
        axios.post(`http://18.191.237.120:3001/${course}/quiz/create`,data,{ headers: { token: localStorage.getItem("token") } })
            .then(response => {
                if(response.status === 200){
                    axios.get(`http://18.191.237.120:3001/${course}/quiz/list`,{ headers: { token: localStorage.getItem("token") } })
                        .then((response) => {
                            dispatch({type:"WRITE",payload:{
                                quiz_list : response.data.data,
                            }})
                    });
                    history.push("/course/"+course+"/quiz");                   
                }else{
                    dispatch({type:"WRITE",payload:{
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    }})
                }
            })
            .catch(error => {
                console.log(error)
                dispatch({type:"WRITE",payload:{
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                }})
            });
    }
}


export function write(data) {
    return function(dispatch){
        dispatch({type:"WRITE",payload:data})
    }
}