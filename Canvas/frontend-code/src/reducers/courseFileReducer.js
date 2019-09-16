export default function reducer(state={
    courseFile : {
        file_list : [],
        file : null,
        is_faculty : localStorage.getItem("user_is_faculty"),
        alertClass : null,
        file_error : false,
        message : null,
    },
},action){
    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                courseFile : {
                    ...state.courseFile,
                    ...action.payload
                }
            })
        }
    }
    return state
}