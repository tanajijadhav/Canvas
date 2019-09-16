import axios from "axios";

export default function fetchData(course,assignment) {
    return function(dispatch){
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
    }
}
