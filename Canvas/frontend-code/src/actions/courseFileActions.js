import axios from "axios";

let get_logic = (course,dispatch) => {
    axios.get(`http://18.191.237.120:3001/${course}/files`,{ headers: { token: localStorage.getItem("token") } })
        .then((response) => {
            dispatch({type:"WRITE",payload:{
                file_list : response.data.data,
                file_error : false
            }})
    });
}

export function getFiles(course) {
    return function(dispatch){
        get_logic(course,dispatch)
    }
}

export function uploadFileHandler (course,data,upload_form){
    return function(dispatch){
        axios.post(`http://18.191.237.120:3001/${course}/files`,data,{ headers: { token: localStorage.getItem("token") } })
            .then(response => {
                console.log(response.data)
                if(response.status === 200){
                    // form reset
                    upload_form.reset();
                    get_logic(course,dispatch)
                }else{
                    dispatch({type:"WRITE",payload:{
                        file_error : true,
                        message : response.data.message,
                    }})
                }
            })
            .catch(error => {
                dispatch({type:"WRITE",payload:{
                    file_error : true,
                    message : error.response.data.message,
                }})
            });
    } 

}

export function dropStudent(data,course,page_number) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/drop_course',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                console.log("Response",response)
                if(response.status === 200){      
                    get_logic(course,page_number,dispatch)
                }else{     
                    dispatch({type:"WRITE",payload:{
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    }})             
                }
            })
            .catch(error => {
                console.log("Inside catch")          
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