export default function reducer(state={
    courseHome : {
        is_faculty : false,
        name : null,
        capacity: null,
        course_id: null,
        created_by: null,
        current_capacity: null,
        current_waitlist: null,
        dept: null,
        description: null,
        name: null,
        room: null,
        term: null,
        waitlist_capacity: null,
        message: null,
        alertClass : null,
        first : true,
        success : true
    },
},action){
    switch(action.type){
        case "WRITE" : {
            return Object.assign({},...state,{
                courseHome : {
                    ...state.courseHome,
                    ...action.payload
                }
            })
        }
    }
    return state
}