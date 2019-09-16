import axios from "axios";

let get_logic = (dispatch,data) => {
    console.log("Inside get logic")
    axios.post('http://18.191.237.120:3001/message',data,{ headers: { token: localStorage.getItem("token") } })
    .then((response)=>{
        console.log("message get",response.data)
        dispatch({type:"WRITE",payload:{
            conversations : response.data.data
        }})
    })
    .catch(err=>{
        console.log("Error \n",err)
        dispatch({type:"ERROR",payload:err})
    })
}

export function getMessage() {
    return function(dispatch){
        get_logic(dispatch,{"filter":"received"})
    }
}

export function getCourses() {
    return function(dispatch){
        if (localStorage.getItem("user_is_faculty") == 'true'){
            axios.get('http://18.191.237.120:3001/faculty',{ headers: { token: localStorage.getItem("token") } })
                .then((response) => {
                dispatch({type:"WRITE",payload:{
                        courses : response.data.data,
                    }
                });
            })
        }   
        else{
            axios.get('http://18.191.237.120:3001/student',{ headers: { token: localStorage.getItem("token") } })
                .then((response) => {
                dispatch({type:"WRITE",payload:{
                        courses : response.data.data,
                    }
                });
            })
        }
    }
}

export function getCoursePeople(course) {
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/${course}/all_people`,{ headers: { token: localStorage.getItem("token") } })
        .then((response) => {
            let people_list = []
            people_list.push(response.data.data.profressor)
            people_list = people_list.concat(response.data.data.student)
            dispatch({type:"WRITE",payload:{
                course_people : people_list
            }})
        }); 
    }
}

export function postMessage(data) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/message_post',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                console.log("Response",response.data);
                if(response.status === 200){
                    get_logic(dispatch,{"filter":"received"});
                }else{
                   console.log("else m")
                }
            })
            .catch(error => {
                // dispatch({type:"WRITE_PROFILE",payload:{
                //     alertClass : "alert alert-danger",
                //     message : error.response.data.message,
                //     first : false,
                // }})
                console.log("error",error)
            });
    }
}

export function postChainMessage(data,callback) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/message_chain',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                console.log("Response",response.data);
                if(response.status === 200){
                    get_logic(dispatch,{"filter":"received"});
                    callback();
                }else{
                   console.log("else m")
                }
            })
            .catch(error => {
                // dispatch({type:"WRITE_PROFILE",payload:{
                //     alertClass : "alert alert-danger",
                //     message : error.response.data.message,
                //     first : false,
                // }})
                console.log("error",error)
            });
    }
}


export function write(data) {
    return function(dispatch){
        dispatch({type:"WRITE",payload:data})
    }
}getCoursePeople