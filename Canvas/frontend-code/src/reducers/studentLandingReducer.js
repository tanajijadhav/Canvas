export default function reducer(state={
    studentLanding : {
        is_courses : false,
        courses_list : [],
        filter_by : null,
        filter_value : null,
        greater_by : false,
        filter_is_courses : false,
        filter_courses_list : [],
        permission_code : null,
        waitlist_button : "Waitlist",
        message: null,
        alertClass : null,
        pc_first : true,
        first : true,
        page_count : 0, //lenght of data
        page_number : 1, //gives current page number
    },
},action){

    switch(action.type){
        case "GET_STATE" : {
            return {...state,studentLanding:action.payload}
        }
        case "WRITE_STATE" : {
            console.log("payload",action.payload)
            return Object.assign({},...state,{
                studentLanding : {
                    ...state.studentLanding,
                    ...action.payload
                }
            })
        }
    }
    return state
}