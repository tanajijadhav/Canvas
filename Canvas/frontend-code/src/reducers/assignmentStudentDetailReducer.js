export default function reducer(state={
    assignmentStudentDetail : {
        title : null,
        body : null,
        due_date : null,
        points : null,
        file : null,
        file_error : false,
        submissions : [],
        is_submitted : false,
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                assignmentStudentDetail : {
                    ...state.assignmentStudentDetail,
                    ...action.payload
                }
            })
        }
    }
    return state
}