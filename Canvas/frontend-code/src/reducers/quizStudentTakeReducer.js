export default function reducer(state={
    quizTake : {
        quiz_id : null,
        quiz_title : null,
        ques_choice : []
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                quizTake : {
                    ...state.quizTake,
                    ...action.payload
                }
            })
        }
    }
    return state
}