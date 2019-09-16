import axios from "axios";

export function getQuizData(course,quiz) {
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/${course}/quiz/${quiz}/detail`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                let ques_choice = null;
                if (response.data.data){
                    ques_choice = response.data.data.ques_choice
                }

                dispatch({type:"WRITE",payload:{
                    quiz_id : response.data.data.id,
                    quiz_title : response.data.data.title,
                    ques_choice : ques_choice
                }})
        });
    }
}

export function postTakeQuizData(course,quiz,data,history) {
    return function(dispatch){
        axios.post(`http://18.191.237.120:3001/${course}/quiz/${quiz}/submit`,{"data":data},{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                axios.get(`http://18.191.237.120:3001/${course}/quiz/student_list`,{ headers: { token: localStorage.getItem("token") } })
                    .then((response) => {
                        dispatch({type:"WRITE",payload:{
                            quiz_list : response.data.data,
                        }})

                });
                history.push("/course/"+course+"/quiz/");
        });
    }
}