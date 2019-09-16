import axios from "axios";

export default function getAssignments(assignment_id) {
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/${assignment_id}/assignment`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                console.log(response)
                dispatch({type:"WRITE_ASSIGNMENT",payload:{
                    assignment_list : response.data.data,
                }})
            });
        }
    }