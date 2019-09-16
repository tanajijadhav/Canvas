import axios from "axios";

export default function getAnnouncement(course) {
    return function(dispatch){
        axios.get(`http://18.191.237.120:3001/${course}/announcement`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                dispatch({type:"WRITE",payload:{
                    announcement_list : response.data.data.announcements,
                    created_by_list : response.data.data.created_by,
                    course_id : course,
                }})
        });
    }
}
