import axios from "axios";

export function getSubmission(submission) {
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/submission/${submission}`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                dispatch({type:"WRITE",payload:response.data.data})
        });
    }
}

export function submitGrade(data,submission,course,assignment,history) {
    return function(dispatch){
        
        axios.post(`http://18.191.237.120:3001/submission/${submission}`,data,{ headers: { token: localStorage.getItem("token") } })
        .then((response) => {
            // axios.get(`http://18.191.237.120:3001/submission/${submission}`,{ headers: { token: localStorage.getItem("token") } })
            //     .then((response) => {
            //     dispatch({type:"WRITE",payload:response.data.data})
            //     history.push("/course/"+course+"/assignments/"+assignment+"/submissions")
            // });
            axios.get(`http://18.191.237.120:3001/${course}/assignment/${assignment}`,{ headers: { token: localStorage.getItem("token") } })
                .then((response) => {
                    dispatch({type:"WRITE",payload:response.data.data})
                    axios.get(`http://18.191.237.120:3001/${course}/assignment/${assignment}/all_submissions`,{ headers: { token: localStorage.getItem("token") } })
                    .then((response) => {
                        dispatch({type:"WRITE",payload:{
                            nested_data : response.data.data
                        }})
                    });
            });
            history.push("/course/"+course+"/assignments/"+assignment+"/submissions")
        });
    }
}


export function write(data) {
    return function(dispatch){
        dispatch({type:"WRITE",payload:data})
    }
}