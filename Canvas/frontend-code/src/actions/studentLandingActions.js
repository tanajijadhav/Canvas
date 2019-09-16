import axios from 'axios';

export function getState() {
    return function(dispatch){
        axios.get('http://18.191.237.120:3001/student',{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
            //update the state with the response data
            // console.log("---response---",response.data.page_count)
            let courses_there = false
            if (response.data.data.length > 0){
                courses_there = true
            }
            dispatch({type:"WRITE_STATE",payload:{
                    is_courses : courses_there,
                    courses_list : response.data.data,
                }
            });
        })
    }
}

export function writeState(data) {
    return function(dispatch){
        dispatch({type:"WRITE_STATE",payload:data})
    }
}


let filter_main_function = (dispatch,data) => {
    axios.post('http://18.191.237.120:3001/course_filter',data,{ headers: { token: localStorage.getItem("token") }})
        .then(response => {
            // console.log("Response",response)
            if(response.status === 200){      
                // console.log("response from backend\n",response.data.data)    
                if (response.data.data.length > 0){
                    dispatch({type:"WRITE_STATE",payload:{
                        filter_courses_list : response.data.data,
                        filter_is_courses : true,
                        first : true,
                        page_count : response.data.page_count,
                        }
                    }); 
                }
                else{
                    dispatch({type:"WRITE_STATE",payload:{
                        filter_courses_list : response.data.data,
                        filter_is_courses : false,
                        first : false,
                        alertClass : "alert alert-danger",
                        message : "No Courses Found",
                        page_count : 0
                        }
                    });
                }
            }else{     
                dispatch({type:"WRITE_STATE",payload:{
                    alertClass : "alert alert-danger",
                    message : response.data.message,
                    first : false,
                    }
                });
            }
        })
        .catch(error => {
            dispatch({type:"WRITE_STATE",payload:{
                alertClass : "alert alert-danger",
                message : error.response.data.message,
                first : false,
                }
            });

        });
}

export function filterLogic(data) {
    return function(dispatch){
        filter_main_function(dispatch,data)
    }
}


export function enroll (data,filter_data) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/enroll_course',data,{ headers: { token: localStorage.getItem("token") }})
        .then(response => {
            console.log("Response",response)
            if(response.status === 200){      
                axios.get('http://18.191.237.120:3001/student',{ headers: { token: localStorage.getItem("token") } })
                    .then((response) => {
                    //update the state with the response data
                    console.log(response.data)
                    let courses_there = false
                    if (response.data.data.length > 0){
                        courses_there = true
                    }
                    dispatch({type:"WRITE_STATE",payload:{
                        is_courses : courses_there,
                        courses_list : response.data.data,
                        first : true,
                        }
                    });
                    filter_main_function(dispatch,filter_data)
                });
            }else{     
                dispatch({type:"WRITE_STATE",payload:{
                    alertClass : "alert alert-danger",
                    message : response.data.message,
                    first : false,
                    }
                });           
            }
        })
        .catch(error => {
            console.log("Inside catch")          
            dispatch({type:"WRITE_STATE",payload:{
                alertClass : "alert alert-danger",
                message : error.response.data.message,
                first : false,
                }
            });        
        });
    }
}

export function drop (data,filter_data) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/drop_course',data,{ headers: { token: localStorage.getItem("token") }})
        .then(response => {
            console.log("Response",response)
            if(response.status === 200){      
                axios.get('http://18.191.237.120:3001/student',{ headers: { token: localStorage.getItem("token") } })
                    .then((response) => {
                    //update the state with the response data
                    console.log(response.data)
                    let courses_there = false
                    if (response.data.data.length > 0){
                        courses_there = true
                    }
                    dispatch({type:"WRITE_STATE",payload:{
                        is_courses : courses_there,
                        courses_list : response.data.data,
                        first : true,
                        }
                    });     
                    filter_main_function(dispatch,filter_data)
                });
            }else{       
                dispatch({type:"WRITE_STATE",payload:{
                    alertClass : "alert alert-danger",
                    message : response.data.message,
                    first : false,
                    }
                });             
            }
        })
        .catch(error => {
            console.log("Inside catch",error.response)          
            dispatch({type:"WRITE_STATE",payload:{
                alertClass : "alert alert-danger",
                message : error.response.data.message,
                first : false,
                }
            });     
        });
    }
}

export function waitlist (data,filter_data) {
    return function(dispatch){
        axios.post('http://18.191.237.120:3001/waitlist_course',data,{ headers: { token: localStorage.getItem("token") }})
        .then(response => {
            console.log("Response",response)
            if(response.status === 200){      
                axios.get('http://18.191.237.120:3001/student',{ headers: { token: localStorage.getItem("token") } })
                    .then((response) => {
                    //update the state with the response data
                    console.log(response.data)
                    let courses_there = false
                    if (response.data.data.length > 0){
                        courses_there = true
                    }
                    dispatch({type:"WRITE_STATE",payload:{
                        is_courses : courses_there,
                        courses_list : response.data.data,
                        pc_first : true,
                        }
                    });  
                    filter_main_function(dispatch,filter_data)
                });
            }else{       
                dispatch({type:"WRITE_STATE",payload:{
                    alertClass : "alert alert-danger",
                    message : response.data.message,
                    pc_first : false,
                    }
                });         
            }
        })
        .catch(error => {
            console.log("Inside catch",error.response)          
            dispatch({type:"WRITE_STATE",payload:{
                alertClass : "alert alert-danger",
                message : error.response.data.message,
                pc_first : false,
                }
            });    
        });
    }
}