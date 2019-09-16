import axios from "axios";


var get_courses = (dispatch) => {
    axios.get('http://18.191.237.120:3001/faculty',{ headers: { token: localStorage.getItem("token") } })
    .then((response)=>{
        dispatch({type:"GET_COURSE",payload:{
            is_courses : response.data.courses,
            courses_list : response.data.data,
        }
    })
    })
    .catch(err=>{
        console.log("Error \n",err)
        dispatch({type:"ERROR",payload:err})
    })
}

export function getCourse() {
    return function(dispatch){
        get_courses(dispatch);
    }
}

export function postCourse(data) {
    return function(dispatch){
        
        axios.post('http://18.191.237.120:3001/course',data,{ headers: { token: localStorage.getItem("token") }})
        .then(response => {
            console.log("Response",response)
            if(response.status === 200){
                get_courses(dispatch);
            }else{
                console.log("Inside else")       
                dispatch({type:"WRITE_COURSE",payload:{
                    alertClass : "alert alert-danger",
                    message : response.data.message,
                    first : false,
                }})             
            }
        })
        .catch(error => {
            console.log("Inside catch")          
            dispatch({type:"WRITE_COURSE",payload:{
                alertClass : "alert alert-danger",
                message : error.response.data.message,
                first : false,
            }})  
        });

    }
}


export function writeCourse(data) {
    return function(dispatch){
        dispatch({type:"WRITE_COURSE",payload:data})
    }
}