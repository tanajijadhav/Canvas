import axios from "axios";

export default function getQuiz(course) {
    console.log("Courses",course)
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/${course}/quiz/student_list`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                dispatch({type:"WRITE",payload:{
                    quiz_list : response.data.data,
                }})
        });

    }
}
