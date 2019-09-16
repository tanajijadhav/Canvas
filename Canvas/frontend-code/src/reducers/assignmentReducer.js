export default function reducer(state={
    assignment : {
        assignment_list : [],
    },
},action){

    switch(action.type){
        case "GET_ASSIGNMENT" : {
            return {...state,assignment:action.payload}
        }
        case "WRITE_ASSIGNMENT" : {
            let obj_key = Object.keys(action.payload)[0]
            return Object.assign({},...state,{
                assignment : {
                    ...state.assignment,
                    ...action.payload
                }
            })
        }
    }
    return state
}