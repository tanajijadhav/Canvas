export default function reducer(state={
    quizStore : {
        quiz_list : []
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                quizStore : {
                    ...state.quizStore,
                    ...action.payload
                }
            })
        }
    }
    return state
}