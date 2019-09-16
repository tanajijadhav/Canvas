import axios from "axios";

let get_logic = (dispatch,course) => {
    axios.get(`http://18.191.237.120:3001/${course}/announcement`,{ headers: { token: localStorage.getItem("token") } })
        .then((response) => {
            dispatch({type:"WRITE",payload:{
                announcement_list : response.data.data.announcements,
                created_by_list : response.data.data.created_by,
                course_id : course,
            }})
    });
}

export function getAnnouncement(course) {
    return function(dispatch){
        get_logic(dispatch,course);
    }
}

export function postAnnouncement(data,announcement_form,course) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/announcement',data,{ headers: { token: localStorage.getItem("token") } })
            .then(response => {
                // console.log("Try")console
                // console.log("Status Code : ",response.data);
                if(response.status === 200){
                    dispatch({type:"WRITE",payload:{
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                        success : true,
                        title : null,
                        announce_message : null,
                    }})
                    // form reset
                    announcement_form.reset();
                    get_logic(dispatch,course);
                }else{
                    dispatch({type:"WRITE",payload:{
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    }})
                }
            })
            .catch(error => {
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