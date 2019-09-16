export default function reducer(state={
    assignmentCreate : {
        title : null,
        body : null,
        due_date : null,
        points : null,
        alertClass : null,
        message : null,
        first : false,
    },
},action){

    switch(action.type){
        case "WRITE_ASSIGNMENT" : {
            return Object.assign({},...state,{
                assignmentCreate : {
                    ...state.assignmentCreate,
                    ...action.payload
                }
            })
        }
    }
    return state
}