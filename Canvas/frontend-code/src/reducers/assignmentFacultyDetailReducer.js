export default function reducer(state={
    assignmentFacultyDetail : {
        title : null,
        body : null,
        due_date : null,
        points : null,
        file : null,
        file_error : false,
        submissions : [],
        is_submitted : false,
        nested_data : []
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                assignmentFacultyDetail : {
                    ...state.assignmentFacultyDetail,
                    ...action.payload
                }
            })
        }
    }
    return state
}