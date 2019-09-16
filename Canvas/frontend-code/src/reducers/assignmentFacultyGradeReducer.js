export default function reducer(state={
    assignmentGrade : {
        created_on : null,
        file : null,
        filename : null,
        grades : null,
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                assignmentGrade : {
                    ...state.assignmentGrade,
                    ...action.payload
                }
            })
        }
    }
    return state
}