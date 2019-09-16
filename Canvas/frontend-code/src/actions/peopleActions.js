import axios from "axios";

let get_logic = (course,page_number,dispatch) => {
    axios.get(`http://18.191.237.120:3001/${course}/people/${page_number}`,{ headers: { token: localStorage.getItem("token") } })
    .then((response) => {
        // console.log("Response from people api",response.data)
        dispatch({type:"WRITE",payload:response.data.data})
        dispatch({type:"WRITE",payload:{
            page_count : response.data.page_count
        }})
    });   
}
export function getPeople(course,page_number) {
    return function(dispatch){
        get_logic(course,page_number,dispatch)
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