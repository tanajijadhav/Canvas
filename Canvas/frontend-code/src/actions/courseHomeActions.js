import axios from "axios";

export default function getDetail(course) {
    return function(dispatch){
        
        dispatch({type:"WRITE",payload:{
            course_id : course
        }})

        let data = {
            course_id : course
        }

        axios.post('http://18.191.237.120:3001/course_detail',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                dispatch({type:"WRITE",payload:response.data.data})
            })
            .catch(error => {
                dispatch({type:"WRITE",payload:{
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                    success : false
                }})      
            });  

    }
}
