import axios from "axios";

export default function getGrade(course) {
    console.log("aandar")
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/${course}/quiz_grade`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                let temp = response.data.data
                axios.get(`http://18.191.237.120:3001/${course}/assignment_grade`,{ headers: { token: localStorage.getItem("token") } })
                .then((response) => {
                    console.log("data",temp)
                    dispatch({type:"WRITE",payload:{
                        grades : temp.concat(response.data.data)
                    }})
                });
            });
    }
}