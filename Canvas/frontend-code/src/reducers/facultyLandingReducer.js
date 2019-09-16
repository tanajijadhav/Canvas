export default function reducer(state={
    facultyLanding : {
        course_id : null, 
        course_name : null,
        course_dept : null,
        course_desc : null,
        course_term : null,
        course_room : null,
        course_capacity : 0,
        course_waitlist_capacity : 0,
        message: null,
        alertClass : null,
        first : true,
        is_courses : false,
        courses_list : [],
    },
},action){

    switch(action.type){
        case "GET_COURSE" : {
            return {...state,facultyLanding:action.payload}
        }
        case "WRITE_COURSE" : {
            return Object.assign({},...state,{
                facultyLanding : {
                    ...state.facultyLanding,
                    ...action.payload
                }
            })
        }
    }
    return state
}