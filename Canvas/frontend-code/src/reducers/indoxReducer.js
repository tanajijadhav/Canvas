export default function reducer(state={
    inbox : {
        conversations : [],
        show : false,
        // show_reply : false,
        courses : [],
        course_people : [],
        receiver : null,
        subject : null,
        message : null,
        chain_message : null,
        course : null,
        // conversation_chain : [],
        converstion_clicked : null,
    },
},action){

    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                inbox : {
                    ...state.inbox,
                    ...action.payload
                }
            })
        }
    }
    return state
}