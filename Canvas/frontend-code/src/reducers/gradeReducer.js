export default function reducer(state={
    studentGrades : {
        grades : []
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                studentGrades : {
                    ...state.studentGrades,
                    ...action.payload
                }
            })
        }
    }
    return state
}