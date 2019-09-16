export default function reducer(state={
    quizFacultyCreate : {
        title : null,
        description : null,
        marks : null,
        start_date : null,
        end_date : null,
        question_list : [],
        question_choice_list : [],
        alertClass : null,
        message : null,
        first : false,
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                quizFacultyCreate : {
                    ...state.quizFacultyCreate,
                    ...action.payload
                }
            })
        }
    }
    return state
}