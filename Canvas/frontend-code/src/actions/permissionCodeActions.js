import axios from "axios";

let get_logic = (dispatch,course) => {
    axios.get(`http://18.191.237.120:3001/${course}/permission_code`,{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                dispatch({type:"WRITE",payload:{
                    permission_list : response.data.data
                }})
        });
}

export function getPermissionCode(course) {
    return function(dispatch){
        get_logic(dispatch,course);
    }
}

export function createPermissionCode(course) {
    return function(dispatch){
        axios.post(`http://18.191.237.120:3001/${course}/permission_code`,{},{ headers: { token: localStorage.getItem("token") } })
            .then((response) => {
                get_logic(dispatch,course);
        });
    }
}
