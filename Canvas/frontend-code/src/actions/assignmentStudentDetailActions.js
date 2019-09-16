import axios from "axios";

export function getData(course,assignment,label_button) {
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/${course}/assignment/${assignment}`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                dispatch({type:"WRITE",payload:response.data.data})
        });

        axios.get(`http://18.191.237.120:3001/${course}/assignment/${assignment}/submissions`,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                if (response.data.data.length > 0){
                    dispatch({type:"WRITE",payload:{
                        submissions : response.data.data,
                        is_submitted : true
                    }})
                    label_button.innerHTML = "Resubmit Assignment"
                }
                else{
                    dispatch({type:"WRITE",payload:{
                        submissions : response.data.data,
                        is_submitted : false
                    }})
                }
                
            })
            .catch(error => {
                console.log("Inside error",error)
        });
    }
}


export function uploadFile(data,course,assignment,file_upload_div,label_button) {
    return function(dispatch){
        axios.post(`http://18.191.237.120:3001/${course}/assignment/${assignment}/submit`,data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                file_upload_div.style.display = "none";
                dispatch({type:"WRITE",payload:{
                    file_error : false,
                    file : null,
                }})
                axios.get(`http://18.191.237.120:3001/${course}/assignment/${assignment}/submissions`,{ headers: { token: localStorage.getItem("token") }})
                    .then(response => {
                        console.log(response.data.data)
                        if (response.data.data.length > 0){
                            dispatch({type:"WRITE",payload:{
                                submissions : response.data.data,
                                is_submitted : true
                            }})
                            label_button.innerHTML = "Resubmit Assignment"
                        }
                        else{
                            dispatch({type:"WRITE",payload:{
                                submissions : response.data.data,
                                is_submitted : false
                            }})
                        }
                        
                    })
                    .catch(error => {
                        console.log("Inside error",error)
                });
            })
            .catch(error => {
                console.log("Inside error",error)
                dispatch({type:"WRITE",payload:{
                    file_error : true
                }})
            });
    }
}


export function write(data) {
    return function(dispatch){
        dispatch({type:"WRITE",payload:data})
    }
}